import { HttpService } from '@services/http-service/http.service';
import {
    Component, OnInit,
    OnDestroy, ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { PermissionsService } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { NotificationService as NT } from '@services/notification/notification.service';
import { ColumnsService } from '@services/columns/columns.service';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { CardViewConfig } from '@interfaces/card-view-config';
import { CardViewCSS } from '@interfaces/card-view-css';

import * as consts from '@consts/global.consts';
import * as urlconsts from '@consts/url.consts';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { SaveButtonAction } from '@enums/save-button-action';
import { School } from '@models/school';
import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';

@Component({
    selector: 'app-schools-list',
    templateUrl: './schools-list.component.html',
    styleUrls: ['./schools-list.component.scss']
})
export class SchoolsListComponent implements OnInit, OnDestroy {
    tableView = localStorage.getItem('tableView') == '1' || false;
    columns: IColumn[] ;
    pageTitle = 'Écoles';
    page = Page.Schools;
    permissions = [Permission.ViewSchools];
    urlParams = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];   
    school: any


    modalTitle = '';
    modalIsVisible: boolean;
    saveAction!: SaveButtonAction;

    @ViewChild('edit') editSchoolCmp !: EditSchoolComponent;
    @ViewChild('dataTable') dataTable !: DataTableComponent;



    constructor(private columnsSrv: ColumnsService, private notif: NotificationService, private http: HttpService, private notification: NT,
        private perm: PermissionsService, private translate: TranslateService, private cdr: ChangeDetectorRef,
        private router: Router) { }

     ngOnInit() {
        if (!this.grantedAccess())
            return;

        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getSchoolsColumns()

    }
   
    getCaptions() {
        this.translate.get([
            "schools-list.title", "schools-list.new-button",
            "schools-list.country", "schools-list.city",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) => {
            this.captions = values;
            this.pageTitle = values["schools-list.title"];

            this.setPageTitle();
            this.defineCardViewConfig();
            this.defineCSSConfig();
        });
    }

    setPageTitle() {
        this.notif.updatePageTitle({
            title: this.pageTitle,
            toggleView: true,
            orderBy: true,
            breadcrumb: [
                { text: this.pageTitle, url: '/schools' },
            ],
            actionsBtn: [
                {
                    text: this.captions["schools-list.new-button"],
                    url: 'javascript:;',
                    onClick: () => this.AddSchool(),
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }
    
    private defineCardViewConfig() {
        this.config = {
            name: "Name",
            url: "/schools",
            bodyAvatar: "Photo",
            defBodyAvatar: consts.defaultSchoolImg,
            info: [
                { key: "Country", value: this.captions["schools-list.country"] },
                { key: "City", value: this.captions["schools-list.city"] },
            ],
            description: "Street",
            buttons: [
                { id: SaveButtonAction.Delete, css: "btn-light-youtube me-3", iconCSS: "fas fa-trash fs-4", title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: SaveButtonAction.Edit, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"], target: "#kt_modal_Examen" },
            ],
        };
    }

    private defineCSSConfig() {
        this.css = {
            // card  : "hover-rotate-start",    //  [ngClass] = "item.Id % 2 == 0 ? 'hover-rotate-start': 'hover-rotate-end'"
            // column: "hover-elevate-up",      //  [ngClass] = "item.Id % 2 == 0 ? 'hover-elevate-up'  : 'hover-elevate-down'"
        };
    }

    listenToChanges() {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges() {
        const that = this
        this.subscriptions.push(this.notif.languageChanged$.subscribe(async (newLanguage: string) => {

            const values = await firstValueFrom(that.translate.use(newLanguage))
            //.subscribe(()=>{
            //     that.columns = that.columnsSrv.getSchoolsColumns()
            // });
            that.getCaptions();
            //limits is 110 ! 
            //  setTimeout(()=>{
            //  },180);
            that.columns = that.columnsSrv.getSchoolsColumns()
            that.dataTable.columns = that.columns
            that.dataTable.selectedColumns = that.columns
            that.dataTable.getRealColumns()


        }));
    }

    listenToViewChanges() {
        this.subscriptions.push(this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        }));
    }

    private grantedAccess(): boolean {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }
    buttonType = ""
    buttonClicked(obj: any) {
        var buttonType = obj?.button
        if (buttonType == SaveButtonAction.Delete) {
            this.deleteSchool(obj.itemId)
        }
        else {
            this.openModal(SaveButtonAction.Edit, obj.item);
        }
    }
    // buttonClicked(row: IGridRow) {
    //     this.buttonType = row?.button
    //     if (this.buttonType == "delete") {
    //         this.deleteSchool(row.data.Id)
    //     }       
    //     else {
    //         this.openModal(SaveButtonAction.Edit, row.data);

    //     }

    // }
    
    deleteSchool(id: number) {
        this.notification.deleteElementAlert().then((result) => {
            if (result.isConfirmed && id != 0) {
          
              this.http.delete(urlconsts.EXAMENS_URL + id)
                    .subscribe({
                        next: () => { this.notification.showSuccess("Votre école a été bien supprimée") },
                        error: err => this.notification.showError("Problème au cour de la suppression")
                    }); 
            }
        })
    }


    AddSchool() {
        this.openModal(SaveButtonAction.New, null);
    }
    

    private openModal(action: SaveButtonAction, school: School) {
        this.saveAction = action;
        this.modalIsVisible = true;
        this.modalTitle = action === SaveButtonAction.New ? 'Add School' : 'Modify School';
        this.school = school;
       this.editSchoolCmp.AddEdit(this.school);
    }

    
    ngOnDestroy() {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}