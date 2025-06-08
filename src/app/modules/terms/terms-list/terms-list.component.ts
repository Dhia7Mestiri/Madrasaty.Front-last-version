import { HttpService } from '@services/http-service/http.service';
import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Router              } from '@angular/router';
import { DatePipe            } from '@angular/common';
import { Subscription, firstValueFrom        } from 'rxjs';
import { TranslateService    } from '@ngx-translate/core';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { NotificationService as NT } from '@services/notification/notification.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';
import { CardViewConfig      } from '@interfaces/card-view-config';
import { CardViewCSS         } from '@interfaces/card-view-css';

import * as consts from '@consts/global.consts';
import * as urlconsts from '@consts/url.consts';
import { SaveButtonAction } from '@enums/save-button-action';
import { EditTermComponent } from '../edit-term/edit-term.component';
import { IGridRow } from '@interfaces/row';
import { UserService } from '@services/user.service';
import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';

@Component({
    selector   : 'app-terms-list',
    templateUrl: './terms-list.component.html',
    styleUrls  : ['./terms-list.component.scss']
})
export class TermsListComponent implements OnInit, OnDestroy
{
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     : IColumn[] ;
    pageTitle   = 'Périodes';
    page        = Page.Terms;
    permissions = [Permission.ViewTerms];
    urlParams   = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];

    saveAction  = SaveButtonAction.Edit;

    @ViewChild('edit') editTermCmp !: EditTermComponent;
    @ViewChild('dataTable') dataTable !: DataTableComponent ;
    term
    SchoolIdUser
    modalTitle
    modalIsVisible:boolean





    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,private http:HttpService,
        private perm: PermissionsService, private translate: TranslateService, private notification: NT,private userservice:UserService,
        private router: Router)
    { }

    ngOnInit()
    {
        
        this.SchoolIdUser = this.userservice.getMemberSchoolId();

        if (!this.grantedAccess())
            return;

        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getTermsColumns();

    }


    

    getCaptions()
    {
        this.translate.get([
            "terms-list.title", "terms-list.new-button",
            "terms-list.end-date", "terms-list.start-date",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["terms-list.title"];

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
                { text: this.pageTitle, url: '/terms' },
            ],
            actionsBtn: [
                {
                    text: this.captions["terms-list.new-button"],
                    url: 'javascript:;',
                    onClick: () =>this.AddTerm(),
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }

    private defineCardViewConfig()
    {
        this.config = {
            name         : "Name",
            url          : "/terms",
            bodyAvatar   : "Photo",
            defBodyAvatar: consts.defaultTermImg,
            info         : [
                { pipeParam: "MMM d, y", pipe: new DatePipe("en-US"), key: "StartDate", value: this.captions["terms-list.start-date"] },
                { pipeParam: "MMM d, y", pipe: new DatePipe("en-US"), key: "EndDate",   value: this.captions["terms-list.end-date"]   },
               
            ],
            // description: "Street",
            buttons    : [
                { id: SaveButtonAction.Delete, css: "btn-light-youtube me-3",  iconCSS: "fas fa-trash fs-4",  title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: SaveButtonAction.Edit, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"],   target: "#kt_modal_Examen"                   },
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
            that.columns = that.columnsSrv.getTermsColumns()
            that.dataTable.columns = that.columns
            that.dataTable.selectedColumns = that.columns
            that.dataTable.getRealColumns()


        }));
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

        return canAccess;
    }

    buttonClicked(obj: any)
    {
        var buttonType= obj?.button   
        this.term      = obj.item;
           
        if( buttonType==SaveButtonAction.Delete){
           this.deleteTerm(this.term)
        
        }else{
    //   this.modalTitle     =  'Modify Term';
    //   this.modalIsVisible = true;
    //   this.editTermCmp.AddEdit(this.term);  
    this.openModal(SaveButtonAction.Edit, this.term);       

        }
    }




    buttonDataTableClicked(row: IGridRow) {      
       var buttonType= row?.button       
       if( buttonType=="delete"){
          this.deleteTerm(row.data)
       }else{
        this.openModal(SaveButtonAction.Edit, row.data);       

       }

    }
    
    deleteTerm(data: any) {
        console.log(data)
        this.notification.deleteElementAlert().then((result) => {   
            if (result.isConfirmed && data?.Id != 0) {
             this.http.delete(urlconsts.SCHOOLYEAR_URL + data?.Id)
                    .subscribe({
                        next: () => { this.notification.showSuccess("Votre période a été bien supprimée") ,this.notif.deleteRow({
                            page: Page.Terms,
                            data: {...this.term,...data},                      
                          })},
                        error: err => this.notification.showError("Problème au cour de la suppression")
                    });   
            }
        })
    }


    AddTerm() {
        this.openModal(SaveButtonAction.New,this.createTerm());
    }
    

    private openModal(action: SaveButtonAction, term: any ) {
        this.saveAction = action;
        this.modalIsVisible = true;
        this.modalTitle = action === SaveButtonAction.New ? 'Add Term' : 'Modify Term';
        this.term = term;
        this.editTermCmp.AddEdit(this.term);  
    }


    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

     private createTerm() {
        return {        
            Id: 0,
            Name: '',
            StartDate: new Date(),
            EndDate:  new Date(),
            SchoolId: this.SchoolIdUser,    
        };
    }   
    
   
}