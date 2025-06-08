import { Component, OnInit,
         OnDestroy              } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';

import { NotificationService    } from '@services/notification.service';
import { HttpService            } from '@services/http-service/http.service';
import { Page                   } from '@enums/page';
import { SaveButtonAction       } from '@enums/save-button-action';
import { IGridRow               } from '@interfaces/row';
import { ISaveButtonData        } from '@interfaces/save-button-data';

import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';

// Import global constants
import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-new-role',
    templateUrl: './new-role.component.html',
    styleUrls  : ['./new-role.component.scss']
})
export class NewRoleComponent implements OnInit, OnDestroy
{
    newRoleName  !: string;
    subscriptions : Subscription[] = [];
    loading       = false;
    error         = '';

    constructor(private notif: NotificationService, private http: HttpService,
        private router: Router, private activatedRoute: ActivatedRoute)
    { }

    ngOnInit()
    {
        this.listenToNewRoleAdded();
    }

    listenToNewRoleAdded()
    {
        // Create new Role, if/when asked to:
        this.subscriptions.push(this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
        {
            if (buttonData.page == Page.Roles && buttonData.action == SaveButtonAction.New)
                this.createNewRole();
        }));
    }

    createNewRole()
    {
        if (!this.newRoleName)
            return;

        this.loading = true;
        this.error   = '';
        try
        {
            const newRole = JSON.stringify({ name: this.newRoleName });
            this.http.create<string>(urls.API_URL + 'roles/', newRole, consts.isProduction)
                .subscribe(
                {
                    next: (data: any) =>  // HttpResponse<any>
                    {
                        // Role Added, update UI
                        const row: IGridRow = {
                            page : Page.Roles,
                            data : { id: data, name: this.newRoleName }
                        };
                        this.notif.addRow(row);

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

    ngOnDestroy()
    {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}