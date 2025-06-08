import { Component, OnInit,
         ChangeDetectionStrategy,
         ChangeDetectorRef,
         OnDestroy                } from '@angular/core';
import { Router                   } from '@angular/router';
import { Subscription             } from 'rxjs';

import { ColumnsService           } from '@services/columns/columns.service';
import { NotificationService as notifService     } from '@services/notification.service';
import { NotificationService as notificationService} from '@services/notification/notification.service';
import { PermissionsService       } from '@services/permissions-service/permissions.service';

import { Page                     } from '@enums/page';
import { Permission               } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { RecitationSessionModel } from '@models/recitation-session-model';
import { RecitationSessionPostModel } from '@models/recitation-session-post-model';
import { FormGroup } from '@angular/forms';
import { MemberFilter } from '@models/member-filter';
import { UserService } from '@services/user.service';
import { MembersListService } from '@services/members/members-list.service';
import { DisciplineService } from '@services/discipline/discipline.service';
import { SessionService } from '@services/session/session.service';
import { ClassroomService } from '@services/classroom/classroom.service';
import { Member } from '@models/member';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Session } from '@models/session';

@Component({
    selector       : 'app-tasmii-session',
    templateUrl    : './tasmii-session.component.html',
    styleUrls      : ['./tasmii-session.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasmiiSessionComponent implements OnInit, OnDestroy
{
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     = this.columnsSrv.getTasmiisColumns();
    pageTitle   = 'Tasmii';
    page        = Page.Tasmii;
    permissions = [Permission.ViewTasmiis];
    urlParams   = 'schoolId=1';
    private subscription!: Subscription;
    modalIsVisible: boolean;
    modalTitle: string;
    saveAction: SaveButtonAction;
    tasmii: any;


     students: MemberFilter[] = [];
     rowData
     reccurenceList;
     sessionsList = [];
     reccurenceFormGroup: FormGroup;
     TasmiiessionForm: FormGroup;
     search = ""
     switchbtn: boolean = false;
     DialogTitle
     session: RecitationSessionModel;
     ReccurenceValue = 0
     sessionPost: RecitationSessionPostModel;
     LevelList = [];
     PhotoPath
     checked = false;
     arrayOfLevels = []
     classrooms
     teachers
     DisciplineList
     currentSessionId
     slotList = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
     DaysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
     teacher
     maxMemberList = 5
     pagenumber = 1
     pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

    constructor(private columnsSrv: ColumnsService, private notif: notifService,
        private perm: PermissionsService, private router: Router,
        private changeDetector: ChangeDetectorRef,private userService:UserService,
            private memberService:MembersListService,
        private disciplineService:DisciplineService,
        private notification: notificationService,
    private sessionService:SessionService,
private classroomService:ClassroomService,
)
    { }

     ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.notif.updatePageTitle({
            title     : this.pageTitle,
            toggleView: true,
            orderBy   : true,
            breadcrumb: [
                { text: this.pageTitle, url: '/tasmiis' },
            ],
            actionsBtn: [
                {
                    text: 'Nouveau Tasmii',
                    url: '/tasmiis/new',
                    modalTarget: 'newTasmii',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });

        this.listenToViewChanges();

         this.TasmiiessionForm = this.sessionService.createTasmiiSessionForm();
         this.disciplineService.getDisciplinesList(1).subscribe((discplinesData) => this.DisciplineList = discplinesData);
         this.sessionService.getReccurence().subscribe((reccurencesData) => this.reccurenceList = reccurencesData);
         this.refreshSessionList(this.pagenumber, this.search);
         this.memberService.getTeachers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
         this.classroomService.getClassroomsList().subscribe((classroomsData) => this.classrooms = classroomsData);
    }

    listenToViewChanges()
    {
        this.subscription = this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        });
    }

    private grantedAccess() : boolean
    {
        

        return true;
    }

    ngAfterContentChecked()
    {
        this.changeDetector.detectChanges();
    }

     fromModel(value: string | null): NgbTimeStruct | null
     {
         if (!value) { return null; }
         const split = value.toString().split(':');
         return { hour: parseInt(split[0], 10), minute: parseInt(split[1], 10), second: parseInt(split[2], 10) };
    }

     toModel(time: NgbTimeStruct | null): string | null
     {
         return time != null ? `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}` : null;
     }

     /*refreshSessionList(pagenumber: number, search: string)
     {
         this.sessionService.getSessions(pagenumber, search).subscribe({
             next: sessions => {
                 this.rowData = sessions.Items;
                if (sessions.length == 0) { this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !") }
             },
             error: err => console.log(err)
         });
     }*/
    refreshSessionList(pagenumber: number, search: string)
{
    this.sessionService.getSessions(pagenumber, search).subscribe({
        next: res => {
            this.rowData = res.Items;
            if (res.Items.length === 0) {
                this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
            }
        },
        error: err => console.log(err)
    });
}
navigateToParticipants(sessionId: number) {
  this.router.navigate(['/tasmii/tasmii/participants', sessionId]);
}



     searchResult(data)
    {
         this.search = data;
         this.refreshSessionList(this.pagenumber, this.search);
     }

     refreshReccurenceValue()
     {
         this.ReccurenceValue = this.TasmiiessionForm.get('RecurrenceId').value;
     }

     getmemberPhotos(photoPath: string)
     {
         return this.memberService.GetMemberPhotoPath(photoPath);
    }

     OpenDiag(id: number)
     {
         this.DialogTitle = id === -1 ? 'Ajouter une session' : 'Modifier une session';
         this.sessionService.getSession(id)
             .subscribe({
                 next: (session: Session) => this.displayTasmiiSession(session),
                 error: err => console.log(err),
             });

         this.sessionService.getRecitationDisciplineLevels(id).subscribe((data) => {
             data.forEach(item => {
                 this.arrayOfLevels.push(item.DisciplineLevelId);
             });
         });

         this.arrayOfLevels = [];
     }

     displayTasmiiSession(TasmiiSession: RecitationSessionModel)
     {
         if (this.TasmiiessionForm) {
             this.TasmiiessionForm.reset();
         }

         this.session = TasmiiSession;
         this.ReccurenceValue = this.session.RecurrenceId;
         this.TasmiiessionForm.patchValue({
             Id: this.session.Id,
             Title: this.session.Title,
             IsSaved: this.session.IsSaved,
             Description: this.session.Description,
             StartDate: new Date(this.session.StartDate + "Z"),
             EndTime: new Date(this.session.EndTime + "Z"),
             Begin: new Date(this.session.Begin).toTimeString().split(' ')[0],
             End: new Date(this.session.End).toTimeString().split(' ')[0],
             DivisionParam: this.session.DivisionParam,
             RecurrenceId: this.session.RecurrenceId,
             DisciplineId: this.session.DisciplineId,
             LevelIds: this.arrayOfLevels,
             ClassroomId: this.session.ClassroomId,
             TeacherId: this.session.TeacherId,
             TypeEvaluation: this.session.TypeEvaluation,
             Jour: this.session.Jour,
             T1: new Date(this.session.T1 + "Z"),
             T2: new Date(this.session.T2 + "Z"),
             T3: new Date(this.session.T3 + "Z")
         });
     }

     async deleteItem(id: number)
     {
         if (await this.notification.deleteElementAlert())
         {
             this.sessionService.deleteSession(id)
                 .subscribe({
                     next: () => { this.notification.showInfo("votre Session  a été bien supprimée "), this.refreshSessionList(this.pagenumber, this.search) },
                     error: err => this.notification.showError(err.error.Message)
                 });
         }
     }

     getTeacherPhoto(TeacherPhoto)
     {
         return this.memberService.GetMemberPhotoPath(TeacherPhoto);
     }

     refreshLevels(selectedDiscipline)
     {
         if (!selectedDiscipline) { return; }
         this.LevelList = this.DisciplineList.find(x => x.Id == selectedDiscipline).DisciplineLevels;
     }

     saveSession()
     {
         const data = { ...this.sessionPost, ...this.TasmiiessionForm.value };
         this.TasmiiessionForm.get('TypeEvaluation').setValue("T");
         if (data.Id == 0)
         {
             this.sessionService.createSession(data)
                 .subscribe({
                     next: () => { this.notification.showSuccess("Votre Session  a été bien ajouté"), this.refreshSessionList(this.pagenumber, this.search) },
                     error: err => this.notification.showError(err.error.Message)
                 });
     }
        else
        {
            this.sessionService.updateSession(data)
                 .subscribe({
                     next: () => { this.notification.showSuccess("Votre Session  a été bien modifié"), this.refreshSessionList(this.pagenumber, this.search) },
                     error: err => this.notification.showError(err.error.Message)
                 });
         }
     }

     paginate(event)
     {
         this.pagenumber = event.page + 1;
         this.refreshSessionList(this.pagenumber, this.search);
     }

    buttonClicked(obj: any)
    {
        console.log("tasmii-session.component: Session ID = ", obj.item, " -> Button clicked = ", obj.button);
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }}
