import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Subscription        } from 'rxjs';
import { Router              } from '@angular/router';
import { TranslateService    } from '@ngx-translate/core';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { ColumnsService      } from '@services/columns/columns.service';

import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';
import { CardViewConfig      } from '@interfaces/card-view-config';
import { CardViewCSS         } from '@interfaces/card-view-css';

import * as consts from '@consts/global.consts';
import { EditDisciplineComponent } from '../edit-discipline/edit-discipline.component';
import { SaveButtonAction } from '@enums/save-button-action';

@Component({
    selector   : 'app-disciplines-list',
    templateUrl: './disciplines-list.component.html',
    styleUrls  : ['./disciplines-list.component.scss']
})
export class DisciplinesListComponent implements OnInit, OnDestroy
{
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     = this.columnsSrv.getDisciplinesColumns();
    pageTitle   = 'Disciplines';
    page        = Page.Disciplines;
    saveAction  = SaveButtonAction.Edit;
    permissions = [Permission.ViewDisciplines];
    urlParams   = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];

    @ViewChild('edit') editDisciplineCmp !: EditDisciplineComponent;
    discipline
    modalTitle
    modalIsVisible:boolean



    // disciplines: Discipline[] = [];
    // switchbtn = false;
    // message;
    // rowData;
    // search = "";
    // pagenumber = 1;
    // DialogTitle: string;
    // DisciplineForm: FormGroup;
    // discipline: Discipline;
    // DisciplinesCount: number;
    // SchoolIdUser;

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,
        private perm: PermissionsService, private translate: TranslateService,
        private router: Router)
        // private notification: NotificationService, private uploadExcelservice: ExcelUploadService,
        // private userservice: UserService, private disciplineService: DisciplineService)
    { }
    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.getCaptions();
        this.listenToChanges();

        // try {
        //     this.SchoolIdUser = this.userservice.getMemberSchoolId();
        //     this.DisciplineForm = this.disciplineService.createDisciplineForm();
        //     this.disciplineService.getDisciplinesCount().subscribe(data => this.DisciplinesCount = data);

        //     this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber);
        // } catch (error) {
        // }
    }

    getCaptions()
    {
        this.translate.get([
            "disciplines-list.title", "disciplines-list.new-button",
            "disciplines-list.school",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["disciplines-list.title"];

            this.setPageTitle();
            this.defineCardViewConfig();
            this.defineCSSConfig();
        });
    }

    setPageTitle()
    {
        this.notif.updatePageTitle({
            title: this.pageTitle,
            toggleView: true,
            orderBy: true,
            breadcrumb: [
                { text: this.pageTitle, url: '/disciplines' },
            ],
            actionsBtn: [
                {
                    text: this.captions["disciplines-list.new-button"],
                    url: '/disciplines/new',
                    modalTarget: 'newDiscipline',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }

    listenToChanges()
    {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges()
    {
        this.subscriptions.push(this.notif.languageChanged$.subscribe((newLanguage: string) =>
        {
            this.translate.use(newLanguage);
            this.getCaptions();
        }));
    }

    private defineCardViewConfig()
    {
        this.config = {
            toolbarCaption: this.captions["disciplines-list.school"],
            toolbarKey    : "SchoolId",  // "School",
            name          : "Name",
            url           : "/disciplines",
            // bodyAvatar : "Photo",
            // defaultIcon: "fa-solid fa-users-viewfinder fs-4x",
            defaultAvatar : consts.defDisciplineImg,
            // info          : [
            //     { key: "SchoolId", value: "École" },
            //     // { key: "NumberDesk",      value: "Bureaux" },
            //     // { key: "NumberChair",     value: "Chaises" },
            // ],
            content       : "Description",
            buttons       : [
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
        this.discipline      = obj.item;
        this.modalTitle     =  this.discipline?.Name;
        this.modalIsVisible = true;
      this.editDisciplineCmp.edit(this.discipline);
    }

    // OpenDiag(id: number)
    // {
    //     this.DialogTitle = id == -1 ? "Ajouter Discipline" : "Modifier Discipline";
    //     this.disciplineService.getDiscipline(id)
    //         .subscribe({
    //             next: (discipline: Discipline) => this.displayDiscipline(discipline),
    //             error: err => console.log(err)
    //         });
    // }

    // displayDiscipline(discipline: Discipline)
    // {
    //     if (this.DisciplineForm) {
    //         this.DisciplineForm.reset();
    //     }
    //     this.discipline = discipline;

    //     this.DisciplineForm.patchValue({
    //         Name: this.discipline.Name,
    //         Description: this.discipline.Description,
    //         SchoolId: this.discipline.SchoolId
    //     });
    // }

    // searchResult(data)
    // {
    //     this.search = data;
    //     this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber);
    // }

    // GetDisciplinesList(SchoolIdUser, pagenumber)
    // {
    //     this.disciplineService.getDisciplines(SchoolIdUser, pagenumber).subscribe({
    //         next: disciplines => {
    //             this.rowData = disciplines;
    //             if (disciplines.length == 0) {
    //                 this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
    //             }

    //         },
    //         error: () => this.notification.showInfo('le chargement des données a échoué.')
    //     });
    // }

    // saveDiscipline()
    // {
    //     if (this.DisciplineForm.valid)
    //     {
    //         if (!this.DisciplineForm.dirty)
    //         {
    //             return;
    //         }

    //         const sc = { ...this.discipline, ...this.DisciplineForm.value };
    //         sc.SchoolId = this.SchoolIdUser
    //         if (sc.Id === 0)
    //         {
    //             this.disciplineService.createDiscipline(sc)
    //                 .subscribe({
    //                     next: () => { this.notification.showSuccess("votre Discipline a été bien  ajoutée "), this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber) },
    //                     error: err => this.notification.showError('Veuillez saisir correctement les champs demandés.')
    //                 });
    //         }
    //         else
    //         {
    //             this.disciplineService.updateDiscipline(sc)
    //                 .subscribe({
    //                     next: () => { this.notification.showSuccess("votre Discipline a été bien  modifiée "), this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber) },
    //                     error: err => this.notification.showError('Oops... Le nom de votre discipline est déjà pris, merci de renseigner un autre nom.')
    //                 });
    //         }
    //     }
    //     else
    //     {
    //         this.notification.showInfo('Veuillez saisir correctement les champs demandés.')
    //     }
    // }


    // async deleteItem(id: number)
    // {
    //     if (await this.notification.deleteElementAlert())
    //     {
    //         this.disciplineService.deleteDiscipline(id)
    //             .subscribe({
    //                 next: () => { this.notification.showInfo("votre Discipline  a été bien supprimée "), this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber) },
    //                 error: err => this.notification.showError(err.error.Message)
    //             });
    //     }
    // }

    // paginate(event)
    // {
    //     this.pagenumber = event.page + 1
    //     this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber)
    // }

    // uploadFile(arg)
    // {
    //     let formData = new FormData();
    //     formData.append('upload', arg);

    //     this.uploadExcelservice.UploadExcel(formData, 'Disciplines/UploadExcel').subscribe(result => {
    //         this.message = result.toString();
    //         this.notification.showSuccess(this.message);
    //         this.GetDisciplinesList(this.SchoolIdUser, this.pagenumber);
    //     });
    // }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}