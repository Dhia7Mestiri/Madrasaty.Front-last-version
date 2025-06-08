import { Component, OnInit,
         ViewChild, OnDestroy    } from '@angular/core';
import { BehaviorSubject,
         Observable,
         Subscription            } from 'rxjs';
import { Router, ActivatedRoute  } from '@angular/router';

import { ColumnsService          } from '@services/columns/columns.service';
import { NotificationService     } from '@services/notification.service';
import { HttpService             } from '@services/http-service/http.service';
import { PermissionsService      } from '@services/permissions-service/permissions.service';

import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';

import { Page                    } from '@enums/page';
import { UserRolesAction         } from '@enums/user-roles-action';
import { Permission              } from '@enums/permission';
import { SaveButtonAction        } from '@enums/save-button-action';
import { IGridRow                } from '@interfaces/row';
import { IUser                   } from '@interfaces/user';
import { ISaveButtonData         } from '@interfaces/save-button-data';

import { DataTableComponent      } from '@modules/data/data-table/data-table.component';
import { UserRolesListComponent  } from '../user-roles-list/user-roles-list.component';
import { AddUsersToRoleComponent } from '../add-users-to-role/add-users-to-role.component';

// Import global constants
import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls  : ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy
{
    @ViewChild(UserRolesListComponent)
    rolesListComp !: UserRolesListComponent;

    @ViewChild(AddUsersToRoleComponent)
    usersListComp !: AddUsersToRoleComponent;

    @ViewChild(DataTableComponent)
    dataTable     !: DataTableComponent;

    columns        = this.columnsSrv.getUsersInRoleColumns();
    roleId        !: number;
    selectedUsers$ = new BehaviorSubject<IUser[]>([]);  // | null;
    selectedUsers  : IUser[] = [];                      // | null;
    canManage      = false;
    subscriptions  : Subscription[] = [];
    modalTitle    !: string;
    modalIsVisible = false;

    page           = Page.UsersInRole;
    permissions    = [Permission.ViewStudents];
    saveAction     = SaveButtonAction.None;
    action        !: UserRolesAction;
    backBtnCaption = "";
    saveBtnCaption = "Fermer";
    loading        = false;
    error          = '';

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,
        private http: HttpService, private perm: PermissionsService,
        private router: Router, private activatedRoute: ActivatedRoute)
    { }

    ngOnInit()
    {
        this.canManage = this.perm.allowedTo([Permission.ManageRoles]);

        this.listenToChanges();
    }

    listenToChanges()
    {
        this.listenToUserSelected();
        // this.listenToInGridButtonClick();
        this.listenToRoleUsersListModified();
    }

    listenToRoleUsersListModified()
    {
        // Update UI if/when role's users list is modified
        this.subscriptions.push(this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
        {
            if (buttonData.page == Page.UsersInRole || buttonData.page == Page.UsersToAddToRole)
            {
                if (this.action == UserRolesAction.ViewUserRoles)
                    return;

                this.modifyUserProperties();
            }

            if (buttonData.action == SaveButtonAction.Delete && buttonData.page == Page.Roles)
            {
                // Role deleted: clear users' data-table
                this.dataTable.clearTable();
                return;
            }
        }));
    }

    listenToUserSelected()
{
    this.subscriptions.push(this.notif.rowSelected$.subscribe(async (row: any) =>
    {
        const patchedRow: IGridRow = {
            page: row.page ?? row.grid,
            data: row.data,
            button: row.button
        };

        console.log("🔵 Patched rowSelected$", patchedRow);

        if (patchedRow.page === Page.Roles)
        {
            console.log("🟢 Role selected:", patchedRow.data?.Id);
            if (this.roleId !== patchedRow.data?.Id)
            {
                this.roleId = patchedRow.data?.Id;
                this.dataTable.urlPath = this.roleId ? 'roles/' + this.roleId +"/users": "";
                console.log("🔄 Calling getData for users in role:", this.dataTable.urlPath);

                await this.dataTable.getData();
            }
        }
        else if (patchedRow.page === Page.UsersInRole || patchedRow.page === Page.UsersToAddToRole)
        {
            console.log("🟡 User(s) selected:", patchedRow.data);
            this.selectedUsers = patchedRow.data ? patchedRow.data : [];
            this.selectedUsers$.next(this.selectedUsers);
        }
    }));
}



    // listenToInGridButtonClick()
    // {
    //     this.subscriptions.push(this.notif.gridButtonClicked$.subscribe(
    //         (row?: IGridRow) =>
    //         {
    //             if (row?.grid != Grid.UsersInRole)
    //                 return;

    //             this.grid          = Grid.UsersInRole;
    //             this.action        = UserRolesAction.ViewUserRoles;
    //             this.selectedUsers = [row.data] ?? [];

    //             this.selectedUsers$.next(this.selectedUsers);

    //             if (this.selectedUsers.length == 0)
    //                 return;

    //             if (row.button == "roles")
    //                 this.showRolesForSelectedUser();

    //             else if (row.button == "perm")
    //                 this.showPermissionsForSelectedUser();
    //         }
    //     ));
    // }

    onGridButtonClick(row: IGridRow)
    {
        this.page          = Page.UsersInRole;
        this.action        = UserRolesAction.ViewUserRoles;
        this.selectedUsers = [row.data] ;

        this.selectedUsers$.next(this.selectedUsers);

        if (this.selectedUsers.length == 0)
            return;

        if (row.button == "roles")
            this.showRolesForSelectedUser();

        else if (row.button == "perm")
            this.showPermissionsForSelectedUser();
    }

    showRolesForSelectedUser()
    {
        this.setButtonCaptions("", "Fermer");

        this.modalTitle     = "Les rôles auquel cet utilisateur appartient";
        this.modalIsVisible = true;

        if (this.rolesListComp)
            this.rolesListComp.getRolesForUser(this.selectedUsers[0]?.id!);

        return false;
    }

    showPermissionsForSelectedUser()
    {
        this.setButtonCaptions("", "Fermer");

        this.saveAction     = SaveButtonAction.None;
        this.modalTitle     = "Les permissions que cet utilisateur possède";
        this.modalIsVisible = true;

        if (this.rolesListComp)
            this.rolesListComp.getPermissionsForUser(this.selectedUsers[0]?.id!);

        return false;
    }

    showAddUsersModal()
    {
        // Show Modal Dialog with tag list to add/pick users
        if (!this.roleId || this.roleId <= 0 || !this.canManage)
            return false;

        this.setButtonCaptions("Annuler", "Ajouter");

        this.page           = Page.UsersToAddToRole;
        this.action         = UserRolesAction.AddToRole;
        this.saveAction     = SaveButtonAction.New;  // AddUsersToRole;
        this.modalTitle     = "Ajouter des utilisateurs à ce rôle";
        this.modalIsVisible = true;

        if (this.rolesListComp)
            this.usersListComp.getUsers(this.roleId);

        return false;
    }

    showRemoveUsersModal()
    {
        if (!this.selectedUsers || this.selectedUsers.length == 0 || !this.canManage)
            return false;

        this.setButtonCaptions("Annuler", "Confirmer");

        this.action         = UserRolesAction.RemoveFromRole;
        this.saveAction     = SaveButtonAction.Delete;  // RemoveUsersFromRole;
        this.modalTitle     = "Êtes-vous sûr?";
        this.modalIsVisible = true;

        return false;
    }

    setButtonCaptions(back: string, save: string)
    {
        this.backBtnCaption = back;
        this.saveBtnCaption = save;
    }

    modifyUserProperties()
    {
        if (!this.selectedUsers || this.selectedUsers.length == 0 || !this.canManage)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            let obs: Observable<any>;
            if (this.action == UserRolesAction.AddToRole)
            {
                // Add User(s) to the selected role
                let json = JSON.stringify({ roleId: this.roleId, users: this.selectedUsers.map(u => u.id) });
                obs      = this.http.create<string>(urls.API_URL + 'roles/' + this.roleId + '/users', json);
            }
            else {
                // Remove User(s) from the selected role
                obs      = this.http.update(urls.API_URL + 'roles/' + this.roleId + '/users',
                    this.selectedUsers.map(u => u.id)
                );
            }

            obs.subscribe(
            {
                next: (data: any) =>  // HttpResponse<any>
                {
                    // Role's users list changed, update [Users in Role] Grid

                    const row: IGridRow = {
                        page : Page.UsersInRole,
                        data : this.selectedUsers  // [0]
                    };

                    if (this.action == UserRolesAction.AddToRole)
                    {
                        // User added to role, update [Users in Role] Grid
                        this.notif.addRow(row);
                    }
                    else if (this.action == UserRolesAction.RemoveFromRole)
                    {
                        this.notif.deleteRow(row);
                        this.selectedUsers = [];
                    }
                    this.selectedUsers$.next(this.selectedUsers);

                    this.loading = false;
                },
                error: (error) =>
                {
                    this.showError(error);
                }
            });
        }
        catch (error: any)
        {
            this.showError(error);
        }
    }

    private showError(error: any)
    {
        if (redirectIfLoginExpired(this.router, this.activatedRoute, error))
            return;

        this.error   = error.message ?? error.error.title ?? consts.DEFAULT_ERROR_MSG;
        this.loading = false;

        const msg    = this.error ?? "Erreur";
        this.notif.showToastr({ title: "Erreur", content: msg, isError: true });
    }

    get pageEnum(): typeof Page
    {
        return Page;
    }

    get userRolesAction() : typeof UserRolesAction
    {
        return UserRolesAction;
    }

    ngOnDestroy()
    {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}