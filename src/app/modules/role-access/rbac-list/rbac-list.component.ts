import { Component, OnInit,
         ViewChild, ElementRef,
         OnDestroy              } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,
         Subscription           } from 'rxjs';

import { NotificationService    } from '@services/notification.service';
import { HttpService            } from '@services/http-service/http.service';
import { ColumnsService         } from '@services/columns/columns.service';
import { PermissionsService     } from '@services/permissions-service/permissions.service';

import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';

import { IRole                  } from '@interfaces/role';
import { IGridRow               } from '@interfaces/row';
import { ISaveButtonData        } from '@interfaces/save-button-data';
import { Page                   } from '@enums/page';
import { GridRowButton          } from '@enums/grid-row-button';
import { Permission             } from '@enums/permission';
import { SaveButtonAction       } from '@enums/save-button-action';

// Import global constants
import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-rbac-list',
    templateUrl: './rbac-list.component.html',
    styleUrls  : ['./rbac-list.component.scss']
})
export class RbacListComponent implements OnInit, OnDestroy
{
    @ViewChild('rename')
    renameInput    !: ElementRef;
    pageTitle       = "Gestion des Rôles";  // "Rôles et Contrôle d'accès";
    columns         = this.columnsSrv.getRbacColumns();
    subscriptions   : Subscription[] = [];
    allRoles        : IRole[] = [];
    selectedRole   !: IRole | null;
    permissions     = [Permission.ViewRoles];
    canManageRoles  = false;
    page            = Page.Roles;
    action          = GridRowButton.None;
    saveBtnCaption !: string;

    loading         = false;
    error           = '';
    modalTitle     !: string;
    modalIsVisible  = false;
    saveAction      = SaveButtonAction.None;

    constructor(private notif: NotificationService, private http: HttpService,
        private columnsSrv: ColumnsService, private perm: PermissionsService,
        private router: Router, private activatedRoute: ActivatedRoute)
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;
    console.log('Can manage roles:', this.canManageRoles);
    console.log('Columns:', this.columnsSrv.getRbacColumns());
    console.log('Received columns:', this.columns);
  console.log('Buttons:', this.columns.filter(c => c.type === 'button'));

        this.listenToChanges();
    }

    private grantedAccess() : boolean
    {
        const canAccess     = this.perm.allowedTo([Permission.ViewRoles, Permission.ManageRoles]);
        this.canManageRoles = this.perm.allowedTo([Permission.ManageRoles]);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }

    listenToChanges()
    {
        this.listenToRoleSelected();
        // this.listenToInGridButtonClick();

        if (this.canManageRoles)
        {
            this.listenToRoleEdited();
        }
    }

    listenToRoleSelected()
    {
        this.subscriptions.push(this.notif.rowSelected$.subscribe((row: IGridRow) =>
        {
            if (row?.page == Page.Roles)
            {
                if (row?.data && this.selectedRole === row?.data)
                    return;

                this.selectedRole = (row?.data && row?.data[0]) || row?.data || undefined;
            }
        }));
    }

    listenToRoleEdited()
    {
        // Delete/Rename Role, if/when asked to:
        this.subscriptions.push(this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
        {
            if (buttonData.page != Page.Roles)
                return;

            if (buttonData.action != SaveButtonAction.Edit && buttonData.action != SaveButtonAction.Delete)
                return;

            if (this.action == GridRowButton.Rename || this.action == GridRowButton.Delete)
                this.modifyRole();
        }));
    }

     listenToInGridButtonClick()
     {
         this.subscriptions.push(this.notif.gridButtonClicked$.subscribe(
             (row?: IGridRow) =>
             {
                 if (row?.page != Page.Roles)
                     return;

                 this.selectedRole = row.data[0] || row.data || null;
                 this.showRbacModal(row);
             }
         ));
     }

    onGridButtonClick(row: IGridRow)
    {
        this.selectedRole = row.data[0] || row.data || null;
        this.showRbacModal(row);
    }

    showRbacModal(row: IGridRow)
    {
        switch (row.button)
        {
            case "edit" : this.navigateToRolePermissions(row.data); break;
            case "ren"  : this.navigateToRolePermissions(row.data); break;
            case "del"  : this.showDeleteRoleModal();               break;

            default: break;
        }
    }

    showRenameRoleModal()
    {
        if (!this.canManageRoles)
            return;

        this.action         = GridRowButton.Rename;
        this.saveAction     = SaveButtonAction.Edit;
        this.saveBtnCaption = "Renommer";
        this.modalTitle     = "Renommer ce rôle";
        this.modalIsVisible = true;
    }

    showDeleteRoleModal()
    {
        if (!this.canManageRoles)
            return;

        this.action         = GridRowButton.Delete;
        this.saveAction     = SaveButtonAction.Delete;
        this.saveBtnCaption = "Supprimer";
        this.modalTitle     = "Êtes-vous sûr?";
        this.modalIsVisible = true;
    }

    showNewRoleModal()
    {
        if (!this.canManageRoles)
            return;

        this.action         = GridRowButton.New;
        this.saveAction     = SaveButtonAction.New;

        this.saveBtnCaption = "Créer";

        this.modalTitle     = consts.newRoleBtnCaption;
        this.modalIsVisible = true;

        return false;
    }

    navigateToRolePermissions(role: IRole)
    {
        this.router.navigate(['roles', role.Id, 'permissions']);
    }

    modifyRole()
    {
        if (!this.selectedRole || !this.canManageRoles)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            let obs  : Observable<any>;
            if (this.action == GridRowButton.Rename)
            {
                obs  = this.http.update<any>(urls.API_URL + 'roles/' + this.selectedRole.Id, {
                    id  : this.selectedRole.Id,
                    name: this.renameInput.nativeElement?.value
                });
            }
            else if (this.action == GridRowButton.Delete)
                obs  = this.http.delete(urls.API_URL + 'roles/' + this.selectedRole.Id);
            else
                return;

            obs.subscribe(
            {
                next: (data: any) =>  // HttpResponse<any>
                {
                    // Role [Renamed | Deleted], update UI

                    const row: IGridRow = {
                        page : Page.Roles,
                        data : this.selectedRole,
                    };

                    if (this.action == GridRowButton.Rename)
                    {
                        this.selectedRole!.Name = this.renameInput.nativeElement?.value;
                        this.notif.saveRow(row);    // this.selectedRole);
                    }
                    else if (this.action == GridRowButton.Delete)
                    {
                        this.notif.deleteRow(row);  // this.selectedRole);
                        this.selectedRole = null;
                    }

                    this.loading   = false;    
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

    get gridRowButton(): typeof GridRowButton
    {
        return GridRowButton;
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

    ngOnDestroy()
    {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}