import { Component, OnInit,
         Input                  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService    } from '@services/notification.service';
import { HttpService            } from '@services/http-service/http.service';
import { PermissionsService     } from '@services/permissions-service/permissions.service';
import { UserService            } from '@services/user.service';
import { Page                   } from '@enums/page';
import { Permission             } from '@enums/permission';
import { log                    } from '@functions/log';
import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';

import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-card-view-masonry',
    templateUrl: './card-view-masonry.component.html',
    styleUrls  : ['./card-view-masonry.component.scss']
})
export class CardViewMasonryComponent implements OnInit
{
    @Input() urlPath     !: string;
    @Input() urlParams    = '';
    @Input() page        !: Page;
    @Input() permissions !: Permission[];

    loading      = false;
    error        = '';
    itemsPerPage = consts.itemsPerPage;
    totalRecords = 0;
    pageNumber   = 1;
    totalPages   = 1;
    data        !: any;
    filterText   = "";
    userId       : number;

    constructor(private http: HttpService, private notif: NotificationService,private userService:UserService,
        private perm: PermissionsService, private router: Router, private activatedRoute: ActivatedRoute)
    { }

    ngOnInit()
    {
        this.userId = this.userService.getMemberId();
        this.getData();
        // this.data = { items: [
        //     { id: 1, name: 'Examen (1)' },
        //     { id: 2, name: 'Examen (2)' },
        //     { id: 3, name: 'Examen (3)' },
        //     { id: 4, name: 'Examen (4)' },
        // ] };
    }

    async getData()
    {
        if (!this.urlPath || !this.permissions || this.permissions.length == 0)
        {
            this.data = { Items: [] };
            return;
        }

        if (!this.perm.allowedTo(this.permissions))
        {
            this.data = { Items: [] };
            return;
        }

        // event.first = First row offset
        // event.rows  = Number of rows per page

        this.loading = true;
        this.error   = '';
        try
        {
            // if (!event?.rows)
            //     event = this.getEventData(event);
            // else
            //     this.filterText = event?.globalFilter ?? '';

            // this.itemsPerPage = event?.rows  || this.itemsPerPage;
            // this.pageNumber   = event?.first && event?.first > 1 ? (event?.first / this.itemsPerPage + 1) : 1;
            const filter      = this.filterText.trim();
            const orderBy     = '';    // this.getSortField(event)?.trim() ?? '';
            const IsOrderAsc  = true;  // (event?.sortOrder == 1);
            const params      = `?PageNumber=${this.pageNumber}&PageSize=${this.itemsPerPage}&OrderBy=${orderBy}&filter=${filter}&IsOrderAsc=${IsOrderAsc}&userId=${this.userId}`;

            this.http.read(urls.API_URL + `${this.urlPath}${params}&${this.urlParams ?? ''}`, false)
                .subscribe(
                {
                    next: (data: any) =>      // HttpResponse<any>
                    {
                        if (data)
                        {
                            this.data = data;
                            // this.totalRecords = data.totalCount;
                            // this.totalPages   = data.totalPages;
                            // this.pageNumber   = data.pageNumber;

                            // if (this.selectedRow)
                            //     this.validateSelectedRow();

                            // Rise a row selection event
                            // this.onRowSelect();

                            log(urls.API_URL + `${this.urlPath}${params}&${this.urlParams ?? ''}`);
                            log(data);
                        }
                        else
                        {
                            this.error = data ?? consts.DEFAULT_ERROR_MSG;
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