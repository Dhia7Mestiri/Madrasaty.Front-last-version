import { Holiday } from '@models/holiday';
import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Subscription, firstValueFrom        } from 'rxjs';
import { Router              } from '@angular/router';
import { DatePipe            } from '@angular/common';
import { TranslateService    } from '@ngx-translate/core';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { ColumnsService      } from '@services/columns/columns.service';

import { Permission          } from '@enums/permission';
import { Page                } from '@enums/page';
import { CardViewConfig      } from '@interfaces/card-view-config';
import { CardViewCSS         } from '@interfaces/card-view-css';

import * as consts from '@consts/global.consts';
import { EditHolidayComponent } from '../edit-holiday/edit-holiday.component';
import { SaveButtonAction } from '@enums/save-button-action';
import { IGridRow } from '@interfaces/row';
import { UserService } from '@services/user.service';
import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';

@Component({
    selector   : 'app-holidays-list',
    templateUrl: './holidays-list.component.html',
    styleUrls  : ['./holidays-list.component.scss']
})
export class HolidaysListComponent implements OnInit, OnDestroy
{
    tableView = true;
    columns     : IColumn[] ; 
    pageTitle   = 'Vacances Scolaires';
    page        = Page.Holidays;
    permissions = [Permission.ViewHolidays];
    urlParams   = '';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];
    saveAction  !: SaveButtonAction;

    @ViewChild('edit') editHolidayCmp !: EditHolidayComponent;

    @ViewChild('dataTable') dataTable !: DataTableComponent ;

    holiday:Holiday
    modalTitle=''
    modalIsVisible:boolean
    SchoolIdUser:number
  
    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,      
        private translate: TranslateService, private perm: PermissionsService,private userservice: UserService,
        private router: Router)
    { }
   
    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.SchoolIdUser = this.userservice.getMemberSchoolId();
        this. urlParams   = `schoolId=${this.SchoolIdUser}`; 
        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getHolidaysColumns();
        
    }

    getCaptions()
    {
        this.translate.get([
            "holidays-list.title", "holidays-list.new-button",
            "holidays-list.end-date", "holidays-list.start-date",
            "holidays-list.school",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["holidays-list.title"];

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
                { text: this.pageTitle, url: '/holidays' },
            ],
            actionsBtn: [
                {
                    text: this.captions['holidays-list.new-button'],  // 'Nouvelle Vacance',
                    url: 'javascript:;',
                    onClick: () =>this.AddHoliday(),
                    modalTarget: '',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }


    private defineCardViewConfig()
    {
        this.config = {
            toolbarKey    : "SchoolId",  
            toolbarCaption: this.captions["holidays-list.school"],  
            name          : "Name",
            url           : "/vacances",      
            defaultAvatar : consts.defaultHolidayImg,
            info          : [
                { pipeParam: "MMM d", pipe: new DatePipe("en-US"), key: "EndDate",   value: this.captions["holidays-list.end-date"]   },
                { pipeParam: "MMM d", pipe: new DatePipe("en-US"), key: "StartDate", value: this.captions["holidays-list.start-date"] },
            ],         
            buttons       : [
                { id: 1, css: "btn-light-youtube me-3", iconCSS: "fas fa-trash fs-4",  title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: 2, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"],   target: "#kt_modal_Examen"                   },
            ],
        };
    }
    private defineCSSConfig()
    {
        this.css = { };
    }

    listenToChanges()
    {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges()
    {

        const that=this ; 
        this.subscriptions.push(this.notif.languageChanged$.subscribe(async(newLanguage: string) =>
        {
            const values = await firstValueFrom(that.translate.use(newLanguage))
            that.getCaptions();
            that.columns = that.columnsSrv.getHolidaysColumns()
            that.dataTable.columns = that.columns
            that.dataTable.selectedColumns = that.columns
            that.dataTable.getRealColumns()
        })) ;

    }

    listenToViewChanges()
    {
        this.subscriptions.push(this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        }));
    }

    private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return true;
    }
      buttonClicked(obj: any) {
        this.openModal(SaveButtonAction.Edit, obj.item);
    }
    
    editHoliday(row: IGridRow) {
        this.openModal(SaveButtonAction.Edit, row.data);
    }
    
    AddHoliday() {
        this.openModal(SaveButtonAction.New);
    }
    
    private openModal(action: SaveButtonAction, holiday: Holiday = this.createHoliday()) {
        this.saveAction = action;
        this.modalIsVisible = true;
        this.modalTitle = action === SaveButtonAction.New ? 'Add Holiday' : 'Modify Holiday';
        this.holiday = holiday;
        this.editHolidayCmp.AddEdit(this.holiday);
    }
    
    private createHoliday(): Holiday {
        return {
            Id: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            Name: '',
            SchoolId: this.SchoolIdUser,
            Recurrence: 0,
        };
    }    
    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}