import { Component, OnInit,
         ViewChild, OnDestroy } from '@angular/core';
import { Router               } from '@angular/router';
import { Subscription, firstValueFrom         } from 'rxjs';
import { TranslateService     } from '@ngx-translate/core';

import { NotificationService  } from '@services/notification.service';
import { ColumnsService       } from '@services/columns/columns.service';
import { PermissionsService   } from '@services/permissions-service/permissions.service';
import { Course               } from '@models/course';
import { Page                 } from '@enums/page';
import { Permission           } from '@enums/permission';
import { IGridRow             } from '@interfaces/row';
import { CardViewConfig       } from '@interfaces/card-view-config';
import { CardViewCSS          } from '@interfaces/card-view-css';

import { EditCourseComponent  } from '../edit-course/edit-course.component';

import * as consts from '@consts/global.consts';
import { SaveButtonAction } from '@enums/save-button-action';
import { IColumn } from '@interfaces/column';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';

@Component({
    selector   : 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls  : ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy
{
    @ViewChild('edit') editCourseCmp !: EditCourseComponent;

    @ViewChild('dataTable') dataTable !: DataTableComponent;


    // rowData : any[] = [];
    // teachersList: Member[] = [];
    // disciplinesList: Discipline[] = [];
    // classrooms: Classroom[] = [];
    // DialogTitle = "";
    // pagenumber  = 1;
    // SchoolIdUser: number;
    // courseForm  : FormGroup;
    // search   = "";
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     : IColumn[] ;
    pageTitle   = "Courses";
    page        = Page.Courses;
    permissions = [Permission.ViewCourses];
    urlParams   = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];

    captions   !: any[];

    course     !: Course;
    modalIsVisible = false;
    modalTitle     = "";  // consts.editCourseModalTitle;

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,
        private perm: PermissionsService, private translate: TranslateService,
        private router: Router)
    {}

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        // this.courseForm = this.courseService.createCourseForm();
        // this.SchoolIdUser = this.userservice.getMemberSchoolId();

        // this.courseService.getTeachers().subscribe((teachersData: Member[]) => this.teachersList = teachersData);
        // // this.courseService.getSubjects().subscribe((subjectData) => this.subjectsList = subjectData);
        // this.disciplineService.getDisciplinesList(this.SchoolIdUser).subscribe((disciplinesData) => this.disciplinesList = disciplinesData);
        // this.classroomService.getClassroomsList().subscribe((classroomsData) => this.classrooms = classroomsData);
        // this.GetCourseList(this.SchoolIdUser, this.pagenumber, this.search);

        this.getCaptions();
        this.listenToChanges();
        this.columns = this.columnsSrv.getCoursesColumns();

    }

    getCaptions()
    {
        this.translate.get([
            "courses-list.title", "courses-list.new-button", "courses-list.coefficient",
            "courses-list.level", "courses-list.discipline"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["courses-list.title"];

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
                { text: this.pageTitle, url: '/courses' },
            ],
            actionsBtn: [
                {
                    text       : this.captions["courses-list.new-button"],
                    url        : '/courses/new',
                    modalTarget: 'newCourse',
                    cssClass   : 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }

    private defineCardViewConfig()
    {
        this.config = {
            toolbarKey    : "Coefficient",
            toolbarCaption: this.captions["courses-list.coefficient"],
            name          : "Name",
            url           : "/courses",
            defaultAvatar : consts.defaultCourseImg,
            info          : [
                { key: "Level",      value: this.captions["courses-list.level"]      },
                { key: "Discipline", value: this.captions["courses-list.discipline"] },
            ],
            users         : [
                { name: "Emma Smith", avatar: "assets/media/avatars/300-6.jpg" },
                { name: "Rudy Stone", avatar: "assets/media/avatars/300-1.jpg" },
                { name: "Susan Redwood" },
            ],

            // TODO: Remove this entry
            description   : "SupervisorId",
        };
    }

    private defineCSSConfig()
    {
        this.css = {
            // card  : "hover-rotate-start",    //  [ngClass]="item.Id % 2 == 0 ? 'hover-rotate-start' : 'hover-rotate-end'"
            // column: "hover-elevate-up",      //  [ngClass]="item.Id % 2 == 0 ? 'hover-elevate-up' : 'hover-elevate-down'"
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
            that.columns = that.columnsSrv.getCoursesColumns();
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
    saveAction
    editCourse(row: IGridRow)
    {
        this.saveAction = SaveButtonAction.Edit;
        this.course         = row.data;
        this.modalTitle     = this.captions["courses-list.edit-course"] + " - " + row.data.Name;
        this.modalIsVisible = true;

        this.editCourseCmp.edit(this.course);
        // this.saveAction = 
    }

    // saveModifiedCourse(modifiedCourse: Course)
    // {
    //     console.log("courses-list.component -> editCourse()", modifiedCourse);
    //     //
    // }

    // GetCourseList(schoolId, pagenumber, search)
    // {
    //     this.courseService.getCourses(schoolId, pagenumber, search).subscribe({
    //         next: coursesList => {
    //             this.rowData = coursesList['Items'];
    //             console.log(this.rowData)
    //             if (coursesList.length == 0) {
    //                 // this.notif.showInfo("il n'y a pas de données disponibles avec ces paramètres !")  
    //             }
    //         },
    //         error: err => err
    //     });
    // }

    // OpenDiag(id: number)
    // {
    //     this.DialogTitle = id == -1 ? "Ajouter un cours" : "Modifier un cours"
    //     this.courseService.getCourse(id)
    //         .subscribe({
    //             next: (course: Course) => this.displayCourse(course),
    //             error: err => console.log(err)
    //         });
    // }

    // displayCourse(course: Course)
    // {
    //     if (this.courseForm) {
    //         this.courseForm.reset();
    //     }
    //     this.course = course;

    //     this.courseForm.patchValue({
    //         Name: this.course.Name,
    //         SupervisorId: this.course.SupervisorId,
    //         DisciplineId: this.course.DisciplineId,
    //         Level: this.course.Level,
    //         Coefficient: this.course.Coefficient,
    //         Active: this.course.Active,
    //     });
    // }

    // async deleteItem(id)
    // {
    //     if (await this.notif.deleteElementAlert()) {
    //         this.courseService.deleteCourse(id)
    //             .subscribe({
    //                 next: () => { this.notif.showInfo(" votre Cours a  été bien  supprimée"), this.GetCourseList(this.SchoolIdUser, this.pagenumber, this.search) },
    //                 error: err => err
    //             });
    //     }
    // }

    // saveCourse()
    // {
    //     if (this.courseForm.valid) {
    //         if (this.courseForm.dirty) {
    //             const cour = { ...this.course, ...this.courseForm.value };

    //             if (cour.Id === 0 || cour.Id === '' || cour.Id === null) {
    //                 this.courseService.createCourse(cour)
    //                     .subscribe({
    //                         next: () => { this.notif.showSuccess("Cours ajoutée avec succès"), this.GetCourseList(this.SchoolIdUser, this.pagenumber, this.search) },
    //                         error: err => err
    //                     });
    //             } else {
    //                 this.courseService.updateCourse(cour)
    //                     .subscribe({
    //                         next: () => { this.notif.showSuccess("Cours modifiée avec succès"), this.GetCourseList(this.SchoolIdUser, this.pagenumber, this.search) },
    //                         error: err => err
    //                     });
    //             }
    //             console.log(cour);
    //         } else {

    //         }
    //     }
    //     else {
    //         this.notif.showInfo('Veuillez saisir correctement les champs demandés.')
    //     }
    // }

    buttonClicked(obj: any)
    {
        console.log("courses-list.component: Course ID = ", obj.item, " -> Button clicked = ", obj.button);
    }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}