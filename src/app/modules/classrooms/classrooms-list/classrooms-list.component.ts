import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Router              } from '@angular/router';
import { Subscription, firstValueFrom        } from 'rxjs';
import { TranslateService    } from '@ngx-translate/core';

import { NotificationService } from '@services/notification.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { PermissionsService  } from '@services/permissions-service/permissions.service';

import { CardViewConfig      } from '@interfaces/card-view-config';
import { CardViewCSS         } from '@interfaces/card-view-css';
import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';
import * as consts from '@consts/global.consts';
import { EditClassroomComponent } from '../edit-classroom/edit-classroom.component';
import { SaveButtonAction } from '@enums/save-button-action';

import { NotificationService as NT  } from '@services/notification/notification.service';
import { HttpService } from '@services/http-service/http.service';
import * as urlconsts from '@consts/url.consts';

import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';

@Component({
    selector   : 'app-classrooms-list',
    templateUrl: './classrooms-list.component.html',
    styleUrls  : ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit, OnDestroy
{
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     : IColumn[] ;
    pageTitle   = 'Salles de cours';
    page        = Page.Classrooms;
    saveAction  = SaveButtonAction.Edit;
    permissions = [Permission.ViewClassrooms];
    urlParams   = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];
    @ViewChild('edit') editClassroomCmp !: EditClassroomComponent;
    @ViewChild('dataTable') dataTable !: DataTableComponent;

    classroom
    modalTitle
    modalIsVisible:boolean

    // message
    // rowData
    // switchbtn: boolean = false;
    // search = "";
    // SchoolIdUser
    // classroom: Classroom;
    // DialogTitle: string;
    // pagenumber = 1
    // ClassroomsCount
    // classroomForm: FormGroup;

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,private uiNotification: NT,private http:HttpService,
        private perm: PermissionsService, private translate: TranslateService,
        private router: Router)
        // private notification: NotificationService, private classroomService: ClassroomService,
        // private userservice: UserService, private uploadExcelservice: ExcelUploadService)
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getClassroomsColumns();

        // this.SchoolIdUser  = this.userservice.getMemberSchoolId();
        // this.classroomForm = this.classroomService.createClassroomsForm();
        // this.classroomService.getClassroomsCount().subscribe(data => this.ClassroomsCount = data);
        // this.GetClassroomsList(this.SchoolIdUser, this.pagenumber, this.search);
    }

    getCaptions()
    {
        this.translate.get([
            "classrooms-list.title", "classrooms-list.new-button",
            "classrooms-list.nbr-desks", "classrooms-list.nbr-projectors",
            "classrooms-list.nbr-chairs", "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["classrooms-list.title"];

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
                { text: this.pageTitle, url: '/classrooms' },
            ],
            actionsBtn: [
                {
                    text: this.captions['classrooms-list.new-button'],
                    url: '/classrooms/new',
                    onClick: () =>this.AddClassroom(),
                    cssClass: 'fw-bold btn-primary',  // Small button = btn-sm                    
                },
            ]
        });
    }
    private defineCardViewConfig()
    {
        this.config = {
            name         : "Name",
            url          : "/classrooms",
            bodyAvatar   : "Photo",
            defBodyAvatar: consts.defClassroomImg,
            info         : [
                { key: "NumberProjector", value: this.captions["classrooms-list.nbr-projectors"] },
                { key: "NumberDesk",      value: this.captions["classrooms-list.nbr-desks"]      },
                { key: "NumberChair",     value: this.captions["classrooms-list.nbr-chairs"]     },
            ],
            buttons    : [
                { id: SaveButtonAction.Delete, css: "btn-light-youtube me-3",  iconCSS: "fas fa-trash fs-4",  title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: SaveButtonAction.Edit, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"],   target: "#kt_modal_Examen"                   },
            ],
        };
    }

    private defineCSSConfig()
    {
        this.css = {
            // card       : "hover-rotate-start",       //  [ngClass] = "item.Id % 2 == 0 ? 'hover-rotate-start': 'hover-rotate-end'"
            // column     : "hover-elevate-up",         //  [ngClass] = "item.Id % 2 == 0 ? 'hover-elevate-up'  : 'hover-elevate-down'"
            // body       : "d-flex flex-center flex-column",
            // description: "fw-semibold text-gray-400 mb-6",
        };
    }

    listenToChanges()
    {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges()
    {
        const that = this
        this.subscriptions.push(this.notif.languageChanged$.subscribe(async (newLanguage: string) => {

            const values = await firstValueFrom(that.translate.use(newLanguage)) ;
            that.getCaptions();
            that.columns = this.columnsSrv.getClassroomsColumns();
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
    AddClassroom(){
        this.modalTitle     =  this.captions["classrooms-list.new-button"];
        this.modalIsVisible = true;
        this.editClassroomCmp.openModal(SaveButtonAction.New);
    }
    buttonClicked(obj: any)
    {
        if(obj.button==SaveButtonAction.Delete)
            {
                this.deleteItem(obj.item.Id)
            }
            else {
                this.classroom      = obj.item;
                this.modalTitle     =  this.classroom?.Name;
                this.modalIsVisible = true;
              this.editClassroomCmp.openModal(SaveButtonAction.Edit,this.classroom);
            }
        
    }
    // searchResult(data)
    // {
    //     this.search = data;
    //     this.GetClassroomsList(this.SchoolIdUser, this.pagenumber, this.search);
    // }

    async deleteItem(id: number)
    {
        this.uiNotification.deleteElementAlert().then((result) => {
            if (result.isConfirmed && id != 0) {

                this.http.delete(urlconsts.CLASSROOM_URL + id)
                    .subscribe({
                        next: () => { this.uiNotification.showSuccess("Votre classe a été bien supprimée") },
                        error: err => this.uiNotification.showError("Problème au cour de la suppression")
                    });
            }
        })
    }

    // GetClassroomsList(SchoolIdUser, pagenumber, search)
    // {
    //     this.classroomService.getClassrooms(SchoolIdUser, pagenumber, search).subscribe({
    //         next: classrooms => {
    //             this.rowData = classrooms;
    //             if (classrooms.length == 0) {
    //                 this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !")
    //             }
    //         },
    //         error: err => this.notification.showInfo('le chargement des données a échoué.')
    //     });
    // }


    // displayClassroom(classroom: Classroom)
    // {
    //     if (this.classroomForm)
    //     {
    //         this.classroomForm.reset();
    //     }
    //     this.classroom = classroom;

    //     this.classroomForm.patchValue({
    //         Name: this.classroom.Name,
    //         NumberProjector: this.classroom.NumberProjector,
    //         NumberDesk: this.classroom.NumberDesk,
    //         NumberChair: this.classroom.NumberChair

    //     });
    // }

    // OpenDiag(id: number)
    // {
    //     this.DialogTitle = id == -1 ? "Ajouter une salle" : "Modifier une sale";
    //     this.classroomService.getClassroom(id)
    //         .subscribe({
    //             next: (classroom: Classroom) => this.displayClassroom(classroom),
    //             error: err => console.log(err)
    //         });
    // }

    // uploadFile(arg)
    // {
    //     let formData = new FormData();
    //     formData.append('upload', arg);

    //     this.uploadExcelservice.UploadExcel(formData, 'Classrooms/UploadExcel').subscribe(result => {
    //         this.message = result.toString();
    //         this.notification.showSuccess(this.message);
    //         this.GetClassroomsList(this.SchoolIdUser, this.pagenumber, this.search);
    //     });
    // }

    // paginate(event)
    // {
    //     this.pagenumber = event.page + 1
    //     this.GetClassroomsList(this.SchoolIdUser, this.pagenumber, this.search)
    // }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}