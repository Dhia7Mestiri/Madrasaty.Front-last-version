import { KeyValue } from '@angular/common';

import { ExamensService } from '@services/Examens/examens.service';
import { CourseService } from 'src/app/services/course/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@services/notification/notification.service';
import { NotificationService as NS } from '@services/notification.service';
import { FormGroup } from '@angular/forms';
import { Examen } from 'src/app/models/examen';
import { Member } from 'src/app/models/member';
import { UserService } from '@services/user.service';
import { UserType } from 'src/app/models/UserType';
import { Course } from 'src/app/models/course';
import { OverviewProfileComponent } from '@modules/shared/shared-profile/overview-profile/overview-profile.component';
import { HttpService } from '@services/http-service/http.service';

import * as consts from '@consts/url.consts';
@Component({
    // selector: '[app-course-profile]', <app-course-profile></app-course-profile>
    selector: 'app-course-profile',
    templateUrl: './course-profile.component.html',
    styleUrls: ['./course-profile.component.scss'],
})
export class CourseProfileComponent implements OnInit {
    @ViewChild('profile') profile: OverviewProfileComponent;

    routedata;
    CourseId;
    courseData: any;  // Course
    courseDataTosend: KeyValue<string, any>[] = [];
    ProfileDataTosend: KeyValue<string, any>[] = [];
    ExamensByCourse;
    StudentsByCourse;
    ExamenForm: FormGroup;
    courseForm: FormGroup;
    DialogTitle;
    examen: Examen;
    course: Course;
    teachersList;
    SchoolIdUser: number;
    terms;
    MemberStatusId;
    disciplinesList;
    actualTearmId;

    pagenumber = 1;
    hide = true;
    selectedTab = 0;

    activeSeance = 0;
    src="/assets/media/illustrations/sketchy-1/2.png"
    TabsList = [
        {
            title: 'Overview',
            href: '#kt_overview',
            id: '-1',
            CssClass: 'nav-link text-active-primary pb-4 active',
        },
        {
            title: 'Settings',
            href: '#kt_settings',
            id: '-1',
            CssClass: 'nav-link text-active-primary pb-4',
        },
        {
            title: 'Etudiants',
            href: '#kt_Etudiants',
            id: '1',
            CssClass: 'nav-link text-active-primary pb-4',
        },
        {
            title: 'Séance',
            href: '#kt_Séances',
            id: '2',
            CssClass: 'nav-link text-active-primary pb-4',
        },
        {
            title: 'Examens',
            href: '#kt_Examens',
            id: '3',
            CssClass: 'nav-link text-active-primary pb-4',
        },
    ];
    constructor(
        private ActivetedRoute: ActivatedRoute,
        private courseService: CourseService,
        private http: HttpService,
        private examenService: ExamensService,
        private notification: NotificationService,
        private userservice: UserService,
        private notif: NS,
    ) {}

    ngOnInit()
    {
        this.SchoolIdUser = this.userservice.getMemberSchoolId();
        this.courseForm = this.courseService.createCourseForm();
        this.MemberStatusId = Object.keys(UserType).map((key) => ({
            label: key,
            value: UserType[key],
        }));
        this.routedata = this.ActivetedRoute.params.subscribe((params) => {
            this.CourseId = params['Id'];
        });
        this.http
            .read(
                consts.SCHOOLYEAR_URL +
                    'SchoolYearsForExamens' +
                    '?schoolId=' +
                    this.SchoolIdUser,
                false
            )
            .subscribe((data) => {
                this.terms = data;
                this.terms.map((item) => {
                    item.Actif =
                        new Date(
                            new Date(item.StartDate).toJSON().slice(0, 10)
                        ) < new Date() &&
                        new Date(new Date(item.EndDate).toJSON().slice(0, 10)) >
                            new Date();
                    if (item.Actif) {
                        this.actualTearmId = item.Id;
                    }
                });
            });
        this.ExamenForm = this.examenService.createExamenForm();
        this.http
            .read(consts.COURSE_URL + this.CourseId, false)
            .subscribe((data) => {
                this.courseData = data;

                this.ProfileDataTosend.push(  
                    { key: 'Enseignant', value: this.courseData?.Supervisor?.FullName },
                    { key: 'Skype ID', value: this.courseData?.Supervisor?.SkypeId },
                    { key: 'Email', value: this.courseData?.Supervisor?.Email },
                    { key: 'PhoneNumber', value: this.courseData?.Supervisor?.PhoneNumber},
                    { key: 'Address', value: this.courseData?.Supervisor?.Street + " , " + this.courseData?.Supervisor?.City + " , " +  this.courseData?.Supervisor?.Country },
                );

                this.courseDataTosend.push(
                    { key: 'Name', value: data.Name },
                    { key: 'Coefficient', value: data.Coefficient },
                    { key: 'Discipline', value: data.DisciplineId },
                    { key: 'Niveau', value: data.Level },
                    { key: 'Enseignant', value: data['Supervisor']?.FullName }
                );

                if (this.courseData.Supervisor)
                {
                    this.courseData.Supervisor.Status = this.findRole(
                        this.courseData?.Supervisor?.Status
                    );
                }
                this.updatePageTitle();
                this.displayCourse(this.courseData);
            });
        this.http
            .read(consts.API_URL + 'Members/Teachers', false)
            .subscribe(
                (teachersData: Member[]) => (this.teachersList = teachersData)
            );
        this.http
            .read(
                consts.DISCIPLINE_URL +
                    'DisciplinesList' +
                    '?schoolId=' +
                    this.SchoolIdUser,
                false
            )
            .subscribe(
                (disciplinesData) => (this.disciplinesList = disciplinesData)
            );
    }

    private updatePageTitle()
    {
        this.notif.updatePageTitle({
            title: "Cours",
            toggleView: false,
            orderBy: false,         
            breadcrumb: [
                { text: "Cours", url: '/courses' },
                { text: this.courseData?.Name, url: '/courses/' + this.CourseId },
            
            ],
            actionsBtn: [                
            ]
        });
    }

    paginate(event) {
        this.pagenumber = event.page + 1;
        if (this.selectedTab == 1) {
        } else if (this.selectedTab == 3) {
            //this.GetExamensByCourseIdAndTermId(this.pagenumber,this.CourseId,this.actualTearmId)
        }
    }

    findRole(value) {
        return this.MemberStatusId.find((x) => x.value == value)?.label;
    }

    findTeacher(value) {
        return this.teachersList.find((x) => x.Id == value)?.FullName;
    }

    onSelectChange($event) {
        // this.GetExamensByCourseIdAndTermId(this.pagenumber,this.CourseId,$event)
    }

    onClick(newTab: number)
    {
        this.selectedTab = newTab;
        if (newTab == 1 || newTab == 2 || newTab == 3) {
            this.hide = false;
        } else {
            this.hide = true;
        }

        if (this.selectedTab == 2)
        {
          this.activeSeance = 0;
        }
    }
    /*   GetExamensByCourseIdAndTermId(pagenumber,CourseId,TermId){
    this.http.read(consts.EXAMENS_URL +"ExamensByCourseId"+ "?_pageNumber=" + pagenumber+"&CourseId=" + CourseId+"&TermId=" + TermId,false).subscribe(data=>{  
      data.map(item=>{
        item['Supervisor']= this.findTeacher(item['SupervisorId'])
        item['Course']=  this.courseData.Name
      })    
      this.ExamensByCourse=data
    })
  } */

    displayCourse(course: Course): void {
        if (this.courseForm) {
            this.courseForm.reset();
        }
        this.course = course;

        this.courseForm.patchValue({
            Name: this.course.Name,
            SupervisorId: this.course.SupervisorId,
            DisciplineId: this.course.DisciplineId,
            Level: this.course.Level,
            Coefficient: this.course.Coefficient,
            Active: this.course.Active,
        });
    }

    UpdateCourse() {
        const cour = { ...this.course, ...this.courseForm.value };
        this.http.update<Course>(consts.COURSE_URL + cour.Id, cour).subscribe({
            next: (data) => {
                this.notification.showSuccess('Cours modifiée avec succès')
            },
            error: (err) => {
                this.notification.showError(
                    'Problème lors de cette modification.'
                ),
                    this.displayCourse(this.courseData);
            },
        });
    }

    seanceChanged(seance: number)    
    {
      this.activeSeance = seance;
    }
}