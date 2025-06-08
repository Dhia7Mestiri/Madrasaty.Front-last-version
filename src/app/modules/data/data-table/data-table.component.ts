import { Input, AfterViewInit,
         ChangeDetectorRef,
         ElementRef, Component,
         OnInit, ViewChild,
         Output, EventEmitter,
         OnDestroy                } from '@angular/core';
import { Router, ActivatedRoute   } from '@angular/router';
import { Subscription             } from 'rxjs';
import { Table                    } from 'primeng/table';
import { LazyLoadEvent, MenuItem  } from 'primeng/api';

import { NotificationService      } from '@services/notification.service';
import { PermissionsService       } from '@services/permissions-service/permissions.service';
import { HttpService              } from '@services/http-service/http.service';
import { IRequest                 } from '@interfaces/request';
import { IGridRow                 } from '@interfaces/row';
import { Page                     } from '@enums/page';
import { Permission               } from '@enums/permission';

import { redirectIfLoginExpired   } from '@functions/url/redirect-login-expired';
import { log                      } from '@functions/log';

import * as consts from '@consts/global.consts';
import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls  : ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('table')  dataTable !: Table;
    @ViewChild('search') searchBox !: ElementRef;
    @ViewChild('head')   head      !: ElementRef;

    @Input() pageTitle   !: string;
    @Input() page        !: Page;
    @Input() sideBar     !: string;
    @Input() colStorage  !: string;
    @Input() dataKey     !: string;
    @Input() urlPath     !: string;
    @Input() permissions !: Permission[];
    @Input() action      !: string;
    @Input() columns     !: any[];
    @Input() showColumns  = true;
    @Input() adaptColumns = false;
    @Input() simpleUI     = false;
    @Input() showFooter   = true;
    @Input() urlParams    = '';
    @Input() 
    tackSelectionChange   = false;
    @Input()
    selectionMode         = 'single';
    @Input()
    hasContextMenu        = true;
    @Output()
    GridButtonClick = new EventEmitter<IGridRow>();

    dataRows       !: any;
    filterText      = "";

    selectedRow     : any;
    selectedColumns : any;
    collapsedColumns: any[] = [];
    realColumns     : any[] = [];
 
    loading         = false;
    error           = '';
    breakpoint      = 1200;
    itemsPerPage    = consts.itemsPerPage;
    totalRecords    = 0;
    pageNumber      = 1;
    totalPages      = 1;
    modalTitle      = "";
    // pageLinks$   = new BehaviorSubject(5);
    subscriptions   : Subscription[] = [];
    observer       !: ResizeObserver;
    contextMenu    !: MenuItem[];


    constructor(private http: HttpService,
        private notif: NotificationService,
        private perm: PermissionsService,
        private router: Router, private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef)
    { }

    ngOnInit()
    {
        // In case user is accessing this page directly, notify page title
        if (!this.colStorage)
            this.colStorage  = Page[this.page];  // this.sideBar;

        if (this.hasContextMenu)
        {
            this.contextMenu = [
                { label: 'Réinitialiser le tri', tooltip: "Réinitialiser le tri",      icon: 'fas fa-sort',       command: () => this.clearSort()  },
                { label: "Réinitialiser",        tooltip: "Réinitialiser l'affichage", icon: 'fas fa-binoculars', command: () => this.clearState() },
                // { label: 'Edition',   icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.selectedProduct) }
                // { label: 'Supprimer', icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.selectedProduct) }
            ];
        }

        this.getRealColumns();
        this.restoreUserChosenColumns();
        this.listenToObservableChanges();
    }

    ngAfterViewInit()
    {
        if (this.showColumns && this.adaptColumns)
            this.listenToResizeEvent();
    }

    listenToResizeEvent()
    {
        const that = this;

        this.observer = new ResizeObserver(entries =>
        {
            that.adjustColumnsVisibility();
        });
        this.observer.observe(this.head.nativeElement);
    }

    adjustColumnsVisibility()
    {
        // Adjust columns visibility depending on the screen size
        let start       = this.realColumns.length - Math.floor(this.dataTable.el.nativeElement.offsetWidth / 200);
        this.breakpoint = this.dataTable.el.nativeElement.offsetWidth - 25;

        this.collapsedColumns = [];
        this.restoreUserChosenColumns();

        for(let i = this.realColumns.length - start; i < this.realColumns.length; i++)
        {
            let idx = this.selectedColumns.findIndex((col: any) => col.field == this.realColumns[i].field);
            if (idx >= 0)
            {
                this.collapsedColumns.push(this.realColumns[i]);
                this.selectedColumns.splice(idx, 1);
            }
        }

        this.cdr.detectChanges();
    }

    clearSort()
    {
        log("clearSort");

        this.dataTable.sortField = '';
        this.dataTable.sortOrder = 0;
        this.dataTable.reset();

        let state = JSON.parse(localStorage.getItem('grid.' + this.colStorage)!);
        delete state['sortField'];
        delete state['sortOrder'];
        localStorage.setItem('grid.' + this.colStorage, JSON.stringify(state));
    }

    clearState()
    {
        log('clearState');

        this.dataTable.clearState();
        this.dataTable.reset();
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

    getRealColumns() {
        if (!this.columns) {
            return;
        }
        this.realColumns = []
        this.columns.forEach(column => {
            if (column.type == "button") { }
            else if (column.customizable)  // || column.type != "button")

                this.realColumns.push(column);
        });
    }

    restoreUserChosenColumns()
    {
        const columns        = localStorage.getItem("columns." + this.colStorage);
        this.selectedColumns = columns ? JSON.parse(columns) : [...this.columns];
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

    private validateSelectedRow()
    {
        if (!this.rowInTable(this.selectedRow))
            this.selectedRow = null;
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
        const i = this.dataRows.Items.findIndex((x: any) => x[this.dataKey] === row[this.dataKey]);
        if (i >= 0)
            this.dataRows.Items[i] = row;
        this.selectedRow = row;
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

    @Input() get selectedCols(): any[]
    {
        return this.selectedColumns;
    }

    set selectedCols(val: any[])
    {
        // Save user columns' choice
        this.selectedColumns = val.filter(col => val.includes(col));

        const columns        = JSON.stringify(this.selectedColumns);
        localStorage.setItem("columns." + this.colStorage, columns);

        // log('data-table -> localStorage.setItem -> Columns(', new Date().toLocaleString(), '): ', this.selectedColumns);
    }

    clearTable()
    {
        this.dataRows = { Items: [] };
    }

    async getData(event?: LazyLoadEvent)
    {
        if (!this.allowedToGetData())
        {
            this.dataRows = { Items: [] };
            return;
        }

        // event.first = First row offset
        // event.rows  = Number of rows per page

        this.loading = true;
        this.error   = '';
        try
        {
            if (!event?.rows)
                event = this.getEventData(event);
            else
                this.filterText = event?.globalFilter ?? '';

            this.itemsPerPage = event?.rows  || this.itemsPerPage;
            this.pageNumber   = event?.first && event?.first > 1 ? (event?.first / this.itemsPerPage + 1) : 1;
            const filter      = this.filterText.trim();
            const orderBy     = this.getSortField(event)?.trim() ?? '';
            const IsOrderAsc  = (event?.sortOrder == 1);
            const params      = `?PageNumber=${this.pageNumber}&PageSize=${this.itemsPerPage}&OrderBy=${orderBy}&filter=${filter}&IsOrderAsc=${IsOrderAsc}`;

            this.http.read(urls.API_URL + `${this.urlPath}${params}&${this.urlParams ?? ''}`, false)
                .subscribe(
                {
                    next: (data: any) =>      // HttpResponse<any>
                    {
                        if (data)
                        {
                            this.dataRows = data;
                            // this.totalRecords = data.TotalCount;
                            // this.totalPages   = data.TotalPages;
                            // this.pageNumber   = data.PageNumber;

                            if (this.selectedRow)
                                this.validateSelectedRow();

                            // Rise a row selection event
                            this.onRowSelect();

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

    allowedToGetData(): boolean
    {
        if (!this.urlPath || !this.permissions || this.permissions.length == 0)
        {
            return false;
        }

        if (!this.perm.allowedTo(this.permissions))
        {
            return false;
        }

        return true;
    }

    getEventData(event?: LazyLoadEvent): LazyLoadEvent
    {
        let data: any = localStorage.getItem('grid.' + this.colStorage);
        if (data)
            data = JSON.parse(data);

        if (event)
        {
            event.first     = data?.first ?? 0;
            event.rows      = data?.rows  ?? consts.itemsPerPage;

            return event;
        }
        else
        {
            this.filterText = data?.filters?.global?.value ?? '';

            return {
                first       : data?.first ?? 0,
                rows        : data?.rows  ?? consts.itemsPerPage,
                globalFilter: this.filterText
            }
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

    getSortField(event?: LazyLoadEvent): string
    {
        const field = event?.sortField ?? '';
        return field.charAt(0).toUpperCase() + field.slice(1);
    }

    filter(event: any)
    {
        this.dataTable.filterGlobal(event.target.value, 'contains');
    }

    onRowSelect()
    {
        this.notif.rowSelected({
            grid: this.page,
            data: this.selectedRow
        });
    }

    onRowUnselect()
    {
        this.notif.rowSelected({
            grid: this.page,
            data: null
        });
    }

    onGridButtonClick(row: any, field: string)
    {
        this.selectedRow = row;
        this.GridButtonClick.emit({ page: this.page, data: row, button: field });
        // this.notif.onGridButtonClick({
        //     grid  : this.grid,
        //     data  : row,
        //     button: field
        // });

        // Clicking on an in-grid button also changes selection that's
        // not automatically cought by primeng table
        this.onRowSelect();

        return false;
    }

    ngOnDestroy()
    {
        this.subscriptions.forEach(sub => sub.unsubscribe());

        this.observer?.unobserve(this.dataTable.el.nativeElement);
    }
}