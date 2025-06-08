import { ChangeDetectionStrategy,
         ChangeDetectorRef,
         Component, OnInit          } from '@angular/core';
import { FormGroup                  } from '@angular/forms';

import { ClassroomService           } from '@services/classroom/classroom.service';
import { DisciplineService          } from '@services/discipline/discipline.service';
import { ExamensService             } from '@services/Examens/examens.service';
import { MembersListService         } from '@services/members/members-list.service';
import { NotificationService        } from '@services/notification/notification.service';
import { SessionService             } from '@services/session/session.service';

import { Member                     } from '@models/member';
import { MemberFilter               } from '@models/member-filter';
import { RecitationSessionModel     } from '@models/recitation-session-model';
import { RecitationSessionPostModel } from '@models/recitation-session-post-model';
import { Session                    } from '@models/session';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector       : 'app-moutoun-sessions',
    templateUrl    : './moutoun-sessions.component.html',
    styleUrls      : ['./moutoun-sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoutounSessionsComponent implements OnInit
{
    students: MemberFilter[] = [];
    studentsByRecitation = [];
    rowData = []
    reccurenceList;
    sessionsList = [];
    MoutounSessionForm: FormGroup;
    search = ""
    switchbtn: boolean = false;
    DialogTitle
    session: RecitationSessionModel;
    ReccurenceValue = 0
    MoutounSessionPost: RecitationSessionPostModel;
    LevelList;
    maxMemberList = 4
    arrayOfLevels = [];
    DaysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    slotList = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    classrooms
    teachers
    DisciplineList
    currentSessionId
    pagenumber = 1
    pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

    constructor(private sessionService: SessionService, private classroomService: ClassroomService,
        private changeDetector: ChangeDetectorRef,
        private memberService: MembersListService, private notification: NotificationService,
        private disciplineService: DisciplineService,
        private examenService: ExamensService)
    { }

    ngOnInit()
    {
        this.MoutounSessionForm = this.sessionService.createMoutounSessionForm();
        this.disciplineService.getDisciplinesList(1).subscribe((discplinesData) => this.DisciplineList = discplinesData);
        this.sessionService.getReccurence().subscribe((reccurencesData) => this.reccurenceList = reccurencesData);
        this.refreshSessionList(this.pagenumber, this.search);
        this.examenService.getTeachers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
        this.classroomService.getClassroomsList().subscribe((classroomsData) => this.classrooms = classroomsData);
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

    getmemberPhotos(Photopath)
    {
        return this.memberService.GetMemberPhotoPath(Photopath)
    }

       GetStudentsByRecitationId(id){
        this.sessionService.GetStudentsByRecitationId(id).subscribe(data=>{
          this.studentsByRecitation=data})
          return this.studentsByRecitation
      }
     

    /*   getSession(): void {
        this.sessionService.sessionIdData.subscribe(data => {
          this.currentSessionId = data;
          this.sessionService.getSession(this.currentSessionId)
            .subscribe({
              next: (session: RecitationSessionModel) => this.displaySession(session),
              error: err => console.log(err)
            });
        })
      } */

    refreshSessionList(pagenumber, search)
    {
        /*this.sessionService.getSessions("M", pagenumber, search).subscribe({
            next: sessions => {
                this.rowData = sessions, this.sessionsList = sessions;
                if (sessions.length == 0) { this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !") }
            },
            error: err => console.log(err)
        });*/
    }

    searchResult(data)
    {
        this.search = data
        this.refreshSessionList(this.pagenumber, this.search)
    }

    get ReccurenceDropDown()
    {
        return this.MoutounSessionForm.get('RecurrenceId');
    }

    refreshReccurenceValue()
    {
        this.ReccurenceValue = this.ReccurenceDropDown.value;
    }

    OpenDiag(id: number)
    {
        this.DialogTitle = id === -1 ? 'Ajouter une session de Moutoun' : 'Modifier une session de Moutoun';
        this.sessionService.getSession(id)
            .subscribe({
                next: (session: Session) => this.displayMoutounSession(session),
                error: err => console.log(err),
            });
        this.sessionService.getRecitationDisciplineLevels(id).subscribe((data) => {
            data.forEach(item => {
                this.arrayOfLevels.push(item.DisciplineLevelId)
            })
        })
        this.arrayOfLevels = [];
    }

    displayMoutounSession(MoutounSession: RecitationSessionModel)
    {
        if (this.MoutounSessionForm) {
            this.MoutounSessionForm.reset();
        }

        this.session = MoutounSession;
        this.ReccurenceValue = this.session.RecurrenceId;
        this.MoutounSessionForm.patchValue({
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
            ClassroomId: this.session.ClassroomId,
            LevelIds: this.arrayOfLevels,
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

    refreshLevels(selectedDiscipline)
    {
        if (!selectedDiscipline) { return; }
        this.LevelList = this.DisciplineList.find(x => x.Id == selectedDiscipline).DisciplineLevels
    }

    saveSession()
    {
        const data = { ...this.MoutounSessionPost, ...this.MoutounSessionForm.value };
        this.MoutounSessionForm.get('TypeEvaluation').setValue("M");
        if (data.Id === 0)
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
        this.pagenumber = event.page + 1
        this.refreshSessionList(this.pagenumber, this.search)
    }
}