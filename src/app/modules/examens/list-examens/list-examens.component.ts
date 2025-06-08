import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Router              } from '@angular/router';
import { Subscription, firstValueFrom        } from 'rxjs';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { NotificationService } from '@services/notification.service';

import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';
import { UserService } from '@services/user.service';
import { CardViewCSS } from '@interfaces/card-view-css';
import { CardViewConfig } from '@interfaces/card-view-config';
import * as consts from '@consts/global.consts';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';
@Component({
    selector   : 'app-list-examens',
    templateUrl: './list-examens.component.html',
    styleUrls  : ['./list-examens.component.scss']
})
export class ListExamensComponent implements OnInit, OnDestroy
{

    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns   : IColumn[] ; 
    pageTitle   = 'Examens';
    page        = Page.Examens;
    permissions = [Permission.ViewExams];
    urlParams   = 'schoolId=1';
    private subscription!: Subscription;


    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];   

    @ViewChild('dataTable') dataTable !: DataTableComponent

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,private translate: TranslateService,
        private perm: PermissionsService, private router: Router,private userService:UserService)
    { }

    ngOnInit()
    {
        this.urlParams= `schoolId=1&userId=${this.userService.getMemberId()}`
        if (!this.grantedAccess())
            return;


        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getExamsColumns();
    }

    private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }


    getCaptions()
    {
        this.translate.get([
            "Exams-list.title", "Exams-list.new-button",
            "Exams-list.end-date", "Exams-list.start-date",
            "Exams-list.school",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["Exams-list.title"];

            this.setPageTitle();
            this.defineCardViewConfig();
            this.defineCSSConfig();
        });
    }


    setPageTitle()
    {
        this.notif.updatePageTitle({
            title     : this.pageTitle,
            toggleView: true,
            orderBy   : true,
            breadcrumb: [
                { text: this.pageTitle, url: '/exams' },
            ],
            actionsBtn: [
                {
                    text : this.captions["Exams-list.new-button"],
                    url: '/exams/new',
                    modalTarget: 'newExam',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }

    private defineCardViewConfig()
    {
        this.config = {
            name         : "Name",
            url          : "/Examens",
            bodyAvatar   : "Photo",
            defBodyAvatar: consts.defaultSchoolImg,
            info         : [
                { pipeParam: "MM dd yyyy", pipe: new DatePipe("en-US"), key: "StartDate", value: this.captions["examens-list.start-date"] },
               
            ],
          
            buttons    : [
                { id: 1, css: "btn-light-youtube me-3",  iconCSS: "fas fa-trash fs-4",  title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: 2, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"],   target: "#kt_modal_Examen"                   },
            ],
        };
    }


    private defineCSSConfig()
    {
        this.css = {
            // card  : "hover-rotate-start",    //  [ngClass] = "item.Id % 2 == 0 ? 'hover-rotate-start': 'hover-rotate-end'"
            // column: "hover-elevate-up",      //  [ngClass] = "item.Id % 2 == 0 ? 'hover-elevate-up'  : 'hover-elevate-down'"
        };
    }
    listenToChanges()
    {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges()
    {
        const that=this
        this.subscriptions.push(this.notif.languageChanged$.subscribe(async (newLanguage: string) =>
        {
            const values = await firstValueFrom(that.translate.use(newLanguage))
            that.getCaptions();
            that.columns = that.columnsSrv.getExamsColumns();
            that.dataTable.columns = that.columns
            that.dataTable.selectedColumns = that.columns
            that.dataTable.getRealColumns()


        }));
    }
    listenToViewChanges()
    {
        this.subscription = this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        });
    }


    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
}