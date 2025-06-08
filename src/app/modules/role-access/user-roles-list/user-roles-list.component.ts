import { Component, Input       } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject        } from 'rxjs';

import { HttpService            } from '@services/http-service/http.service';
import { NotificationService    } from '@services/notification.service';
import { ColumnsService         } from '@services/columns/columns.service';
import { IClaim                 } from '@interfaces/claim';
import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';
import { log                    } from '@functions/log';

// Import global constants
import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-user-roles-list',
    templateUrl: './user-roles-list.component.html',
    styleUrls  : ['./user-roles-list.component.scss']
})
export class UserRolesListComponent
{
    @Input()
    userId         !: number;
    optionLabel    !: string;
    optionValue    !: string;
    selectedItem   !: any;
    allPermissions  = this.columnsSrv.getPermissions();

    data$    = new BehaviorSubject<string[]>([]);
    loading  = false;
    error    = '';
    urlPath !: string;

    constructor(private http: HttpService, private notif: NotificationService,
        private router: Router, private activatedRoute: ActivatedRoute,
        private columnsSrv: ColumnsService)
    { }

    getPermissionsForUser(userId: number)
    {
        this.userId      = userId;

        this.urlPath     = "users/" + userId + "/permissions";
        this.optionLabel = "type";
        this.optionValue = "value";

        this.getData(false);
    }

    getRolesForUser(userId: number)
    {
        this.userId      = userId;

        this.urlPath     = "roles/user/" + this.userId;
        this.optionLabel = "name";
        this.optionValue = "id";
    
        this.getData(true);
    }

    private getData(isRole: boolean)
    {
        if (!this.userId || this.userId <= 0)
            return;

        if (!this.urlPath)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            this.http.read(urls.API_URL + this.urlPath, false)
                .subscribe(
                {
                    next: (data: any) =>  // HttpResponse<any>
                    {
                        if (data && data.Items)
                        {
                            if (!isRole)
                            {
                                data.Items = data.Items.map((engPerm: IClaim) =>
                                {
                                    const frPerm = this.allPermissions.find(p => p.value == engPerm.value);
                                    return frPerm ? { type: frPerm.type, value: engPerm.value } : engPerm;
                                });
                            }

                            this.data$.next(data.Items);

                            log("data: ", data);
                        }
                        else
                        {
                            this.showError(data);
                        }
    
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
}