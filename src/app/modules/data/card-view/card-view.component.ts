import { Component, OnInit,
         Input, Output,
         EventEmitter           } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent          } from 'primeng/api';

import { NotificationService    } from '@services/notification.service';
import { HttpService            } from '@services/http-service/http.service';
import { PermissionsService     } from '@services/permissions-service/permissions.service';
import { UserService            } from '@services/user.service';
import { Page                   } from '@enums/page';
import { Permission             } from '@enums/permission';
import { log                    } from '@functions/log';
import { redirectIfLoginExpired } from '@functions/url/redirect-login-expired';
import { CardViewCSS            } from '@interfaces/card-view-css';
import { CardViewConfig         } from '@interfaces/card-view-config';

import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';
import { SaveButtonAction } from '@enums/save-button-action';
import { Subscription } from 'rxjs';
import { IGridRow } from '@interfaces/row';
import { IRequest } from '@interfaces/request';

@Component({
    selector   : 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls  : ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit 
{
    @Input()
    config      !: CardViewConfig;
    @Input()
    css         !: CardViewCSS;
    @Input()
    frontUrlPath!: string;
    @Input()
    apiUrlPath  !: string;
    @Input()
    apiUrlParams = '';
    @Input()
    page        !: Page;
    @Input()
    permissions !: Permission[];
    @Input() dataKey     !: string;
    @Input() urlPath     !: string;
    @Input() urlParams    = '';

    @Output()
    btnClicked   = new EventEmitter<{ item: any, itemId: number, button: SaveButtonAction }>();

    loading      = false;
    error        = '';
    itemsPerPage = consts.itemsPerPage;
    totalRecords = 0;
    pageNumber   = 1;
    data        !: any;
    filterText   = "";
    userId       : number;
    subscriptions   : Subscription[] = [];
    dataRows!:any;
    selectedRow     : any;
    tackSelectionChange   = false;
    selectedColumns : any;


    constructor(private http: HttpService, private notif: NotificationService,private userService:UserService,
        private perm: PermissionsService, private router: Router, private activatedRoute: ActivatedRoute)
    { }

    ngOnInit()
    {
        if (!this.frontUrlPath)
        {
            this.frontUrlPath = this.apiUrlPath;
        }

        this.userId = this.userService.getMemberId();
        this.getData();
        this.listenToObservableChanges();

    }

    buttonClick(item: any, itemId: number, buttonId: SaveButtonAction)
    {
        this.btnClicked.emit({
            item  : item,
            itemId: itemId,
            button: buttonId,
            
    })
}

    gotoPage(event: any)
    {
        this.pageNumber = event.page + 1;
        this.getData(event);
    }

    async getData(event?: LazyLoadEvent)
    {
        if (!this.allowedToGetData())
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

            this.itemsPerPage = event?.rows  || this.itemsPerPage;
            // this.pageNumber= event?.first && event?.first > 1 ? (event?.first / this.itemsPerPage + 1) : 1;
            const filter      = this.filterText.trim();
            const orderBy     = '';    // this.getSortField(event)?.trim() ?? '';
            const IsOrderAsc  = true;  // (event?.sortOrder == 1);
            const params      = `?PageNumber=${this.pageNumber}&PageSize=${this.itemsPerPage}&OrderBy=${orderBy}&filter=${filter}&IsOrderAsc=${IsOrderAsc}&userId=${this.userId}`;

            this.http.read(urls.API_URL + `${this.apiUrlPath}${params}&${this.apiUrlParams ?? ''}`, false)
                .subscribe(
                {
                    next: (data: any) =>      // HttpResponse<any>
                    {
                        if (data)
                        {
                            this.data         = data;
                            this.totalRecords = data.TotalCount;
                            // this.totalPages   = data.TotalPages;
                            // this.pageNumber   = data.PageNumber;

                            // if (this.selectedRow)
                            //     this.validateSelectedRow();

                            // Rise a row selection event
                            // this.onRowSelect();

                            log(urls.API_URL + `${this.apiUrlPath}${params}&${this.apiUrlParams ?? ''}`);
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


    allowedToGetData(): boolean
    {
        if (!this.apiUrlPath || !this.permissions || this.permissions.length == 0)
        {
            return false;
        }

        if (!this.perm.allowedTo(this.permissions))
        {
            return false;
        }

        return true;
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


    
    listenToObservableChanges()
    {
        this.listenToRowEdited();
        if (this.tackSelectionChange)
            this.listenToRowSelected();
        

        this.listenToCustomQueryChange();

        this.listenToRowAdded();
        this.listenToRowDeleted();
    }

    listenToRowAdded()
    {
        this.subscriptions.push(this.notif.rowAdded$.subscribe((row: IGridRow) =>
        {
            if (row && row.data && row.page == this.page)
                this.addRow(row.data);
        }));
    }
    private addRow(row: any)
    {
        if (!this.rowInTable(row))
        {
            if (row[0])
                this.dataRows.Items.push(...row);
            else
                this.dataRows.Items.push(row);

            this.totalRecords       += row[0] ? row.length : 1;
            this.dataRows.totalCount = this.totalRecords;
        }
    }

    private rowInTable(row: any): boolean
    {
        return row[0]
            ? this.dataRows.Items.find((x: any) => x[this.dataKey] == row[0][this.dataKey])
            : this.dataRows.Items.find((x: any) => x[this.dataKey] == row[this.dataKey]);
    }

    
    listenToCustomQueryChange()
    {
        // Listen to node change (coming from sidebar-requests) & act upon it
        this.subscriptions.push(this.notif.requestChanged$.subscribe(
            async (request: IRequest) =>
            {
                this.urlPath             = request.url;
                this.urlParams           = request.urlParams ?? '';
                if (request.newColumns)
                    this.selectedColumns = request.newColumns;

                await this.getData(undefined);
            }));
    }

    
    listenToRowSelected()
    {
        this.subscriptions.push(this.notif.rowSelected$.subscribe(
            (row: IGridRow) =>
            {
                if (row.page != this.page)
                    return;
            }));
    }
    
    listenToRowDeleted()
    {
        this.subscriptions.push(this.notif.rowDeleted$.subscribe((row: IGridRow) =>
        {
            if (row && row.data && row.page == this.page)
            {
                if (row.data[0])
                    row.data.forEach((row: any) => this.deleteRow(row));
                else
                    this.deleteRow(row.data);
            }
        }));
    }
    private deleteRow(row: any)
    {
        const i = this.dataRows.Items.findIndex((x: any) => x[this.dataKey] === row[this.dataKey]);
        if (i >= 0)
        // if (this.rowInTable(row))
            this.dataRows.Items.splice(i, row[0] ? row.length : 1);
        this.selectedRow = null;
    }
    listenToRowEdited()
    {
        this.subscriptions.push(this.notif.rowModified$.subscribe((row: IGridRow) =>
        {  
         
            if (row && row.data && row.page == this.page)
                this.updateCachedRow(row.data);
                
        }));
    }

     
    private updateCachedRow(row: any)
    {
        
      
        const i = this.data.Items.findIndex((x: any) => x[this.dataKey] === row[this.dataKey]);
        if (i >= 0)
            this.data.Items[i] = row;
        this.selectedRow = row;
    } 
}