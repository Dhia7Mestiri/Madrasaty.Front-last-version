import { ChangeDetectorRef, Component, OnInit    } from '@angular/core';
import {  FormGroup           } from '@angular/forms';
import { Router } from '@angular/router';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { ColumnsService } from '@services/columns/columns.service';
import { NotificationService as NT } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-course-historique',
    templateUrl: './course-historique.component.html',
    styleUrls  : ['./course-historique.component.scss']
})
export class CourseHistoriqueComponent implements OnInit
{
    moutounDialog: boolean;
    CourseSessionDetail
    Cours: any[];
    submitted: boolean;
    teachers
    CoursesTitle
    show=false
    MoutounRecitaionsSessions
    EvaluationDates
    SearchForm: FormGroup;
    CourseSessionHistoriqueForm: FormGroup;
    _originalFormData
    studentId



    
    columns     = this.columnsSrv.getCoursesColumns();
    pageTitle   = 'Courses Historique';
    page        = Page.Courses;
    permissions = [Permission.ViewCourses];
    urlParams   = 'schoolId=1';
    private subscription!: Subscription;


    constructor(       
        private columnsSrv: ColumnsService, private notif: NT,
        private perm: PermissionsService, private router: Router,
        private changeDetector: ChangeDetectorRef)
        
    {}

    ngOnInit()
    {
        if (!this.grantedAccess())
        return;
        this.setPageTitle()
    }


    private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }
    setPageTitle()
    {
        this.notif.updatePageTitle({
            title     : this.pageTitle,
            toggleView: false,
            orderBy   : true,
            breadcrumb: [
                { text: this.pageTitle, url: '/courses' },
            ],
            actionsBtn: [
                {
                    text:     'Nouveau course',
                    url        : '/courses/new',
                    modalTarget: 'newCourse',
                    cssClass   : 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
        
    }

    ngAfterContentChecked()
    {
        this.changeDetector.detectChanges();
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
/* 
    paginate(event)
    {
        this.SearchForm.get('PageNumber').setValue(event.page + 1);
        this.submitFilter();
    }

    submitFilter()
    {
        const searchData = { ...this.SearchForm.value };
        this.courseSessionService.SearchCoursSession(searchData.PageNumber, searchData.TeacherId, searchData.CourseId).subscribe(data => {
            this.Cours = data
            if (data.length == 0) {
                this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
            }
        });
    }

    ResetForm()
    {
        this.SearchForm.reset(this._originalFormData);
    }

    editItem(item: any)
    {
        this.moutounDialog = true;
        this.displaCourseSessionDetail(item)
        this.studentId = item.StudentId
    }

    displaCourseSessionDetail(CourseSession)
    {
        this.CourseSessionHistoriqueForm.patchValue({
            Id: CourseSession.Id,
            Wording: CourseSession.Wording,
            CourseId: CourseSession.CourseId,
            Course: CourseSession.Course,
            Remarque: CourseSession.Remarque,
            StartDate: new Date(CourseSession.StartDate + "Z"),
            EndTime: new Date(CourseSession.EndTime + "Z"),
            Begin: new Date(CourseSession.Begin).toTimeString().split(' ')[0],
            End: new Date(CourseSession.End).toTimeString().split(' ')[0],
        });
    }

    async deleteItem(item)
    {
        if (await this.notification.deleteElementAlert()) {
            this.courseSessionService.deleteCourseSession(item.Id)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre session de coure a été bien supprimée"), this.submitFilter() },
                    error: err => console.log(err)
                });
        }
    }

    hideDialog()
    {
        this.moutounDialog = false;
        this.submitted = false;
    }

    saveCoure()
    {
        this.submitted = true;
        const aux = { ... this.CourseSessionDetail, ...this.CourseSessionHistoriqueForm.value };
        if (aux.Id !== 0 || aux.Id !== '' || aux.Id !== null) {
            this.courseSessionService.updateCourseSession(aux)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre session de coure a été bien modifié"), this.submitFilter() },
                    error: err => err
                });
        }
        this.moutounDialog = false;
    } */
}