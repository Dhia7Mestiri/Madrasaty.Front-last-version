import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router       } from '@angular/router';

import { ColumnsService               } from '@services/columns/columns.service';
import { NotificationService          } from '@services/notification.service';
import { HttpService                  } from '@services/http-service/http.service';
import { PermissionsService           } from '@services/permissions-service/permissions.service';
import { IClaim                       } from '@interfaces/claim';
import { Permission                   } from '@enums/permission';
import { getQueryParam                } from '@functions/url/query-params';
import { redirectIfLoginExpired       } from '@functions/url/redirect-login-expired';
import { log                          } from '@functions/log';

import { SuccessNotificationComponent } from '@shared/success-notification/success-notification.component';

// Import global constants
import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-rbac-edit',
    templateUrl: './rbac-edit.component.html',
    styleUrls  : ['./rbac-edit.component.scss']
})
export class RbacEditComponent implements OnInit
{
    @ViewChild(SuccessNotificationComponent)
    toastr    !: SuccessNotificationComponent;

    pageTitle  = "Permissions";  //  » Edition
    successMsg = "Les permissions ont bien été modifiées!";
    loading    = false;
    error      = '';
    canManage  = this.perm.allowedTo([Permission.ManageRoles]);
    roleId             !: number;
    roleName           !: string;
    allPermissions      : IClaim[] = this.columnsSrv.getPermissions();
    availablePermissions: IClaim[] = [];
    selectedPermissions : IClaim[] = [];

    constructor(private notif: NotificationService, private columnsSrv: ColumnsService,
        private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute,
        private perm: PermissionsService)
    { }

    ngOnInit()
    {
        if (!this.getRoleFromRouter())
        {
            this.router.navigate(["roles"]);
            return;
        }

        // In case user is accessing this page directly, notify the [ navbar ] component to change the active menu item
        this.notif.updatePageTitle({ title: this.pageTitle });

        this.getPermissions();
    }

    getRoleFromRouter() : boolean
    {
        this.roleId = +getQueryParam(this.activatedRoute, 0);
        return this.roleId > 0;
    }

    getPermissions()
    {
        if (!this.roleId)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            this.http.read(urls.API_URL + 'roles/' + this.roleId + '/permissions', false)
                .subscribe(
                {
                    next: (data: any) =>  // HttpResponse<any>
                    {
                        if (data && data.Items)
                        {
                            // In case user is accessing this page directly, notify the [ navbar ] component to change the active menu item
                            this.notif.updatePageTitle({
                                title: this.pageTitle + " pour le rôle ",
                                // badge   : data.parentName,
                                // sideMenu: "role"
                            });

                            this.selectedPermissions  = data.Items.map((engPerm: IClaim) =>
                            {
                                const frPerm = this.allPermissions.find(p => p.value == engPerm.value);
                                return frPerm ? { type: frPerm.type, value: engPerm.value } : engPerm;
                            });
                            this.availablePermissions = this.allPermissions.filter(allPerm =>
                            {
                                return !this.selectedPermissions.some(selPerm => selPerm.value == allPerm.value)
                            });

                            // log("selectedPermissions = ", this.selectedPermissions);
                            // log("availablePermissions = ", this.availablePermissions);
                            // log("allPermissions = ", this.allPermissions);

                            log("data = ", data);
                        }
                        else
                            this.showError(null);

                        this.loading = false;
                    },
                    error: (error) =>
                    {
                        this.showError(error);

                        this.availablePermissions = this.allPermissions;
                    }
                });
        }
        catch (error: any)
        {
            this.showError(error);
        }
    }

    showError(error: any)
    {
        if (redirectIfLoginExpired(this.router, this.activatedRoute, error))
            return;

        this.error   = error.message ?? error.error.title ?? consts.DEFAULT_ERROR_MSG;
        this.loading = false;
    }

    updatePermissions()
    {
        if (!this.selectedPermissions || !this.canManage)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            this.http.update<IClaim[]>(urls.API_URL + 'roles/' + this.roleId + '/permissions', this.selectedPermissions)
                .subscribe(
                {
                    next: (data: any) =>  // HttpResponse<any>
                    {
                        this.loading = false;
                        const msg    = this.successMsg ?? "Succès";
                        this.toastr.show(msg);
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
}