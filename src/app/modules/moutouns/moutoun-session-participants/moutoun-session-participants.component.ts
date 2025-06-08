import { Component, OnInit            } from '@angular/core';
import { ActivatedRoute               } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MembersListService           } from '@services/members/members-list.service';
import { SessionParticipantService    } from '@services/session-participants/session-participants.service';

@Component({
    selector   : 'app-session-participants',
    templateUrl: './moutoun-session-participants.component.html',
    styleUrls  : ['./moutoun-session-participants.component.scss']
})
export class MoutounSessionParticipantsComponent implements OnInit
{
    sessionId;
    students;
    dataSource
    Times: any[]
    dragDisabled = true;
    Studentarray: any[] = [];

    constructor(private sessionParticipantService: SessionParticipantService,
        private route: ActivatedRoute, private membersService: MembersListService)
    { }

    ngOnInit()
    {
        const param = this.route.snapshot.paramMap.get('Id');
        if (param) { this.sessionId = param; }
        this.getStudents()
        this.sessionParticipantService.GetAllStartTime(this.sessionId).subscribe((data) => {
            this.Times = data;
            this.Times.sort((a, b) => this.hmsVal(a) - this.hmsVal(b));
        });
    }

    hmsVal(i)
    {
        const [, h, m, s] = i.match(/(\d\d):(\d\d):(\d\d)/);
        return Number(h) * 3600 + Number(m) * 60 + Number(s);
    }

    getmemberPhotos(Photopath)
    {
        return this.membersService.GetMemberPhotoPath(Photopath)
    }

    getStudents()
    {
        this.sessionParticipantService.GetStudents(this.sessionId).subscribe({
            next: participants => {
                this.students = participants;
                this.dataSource = participants
            },
            error: err => console.log(err)
        });
    }

    /*   setStudentPresence(sessionPart){
        this.model = {
          StudentId : sessionPart.StudentId,
          SessionId : this.currentSession["Id"],
          FullName : sessionPart.FullName,
          BirthDate : sessionPart.BirthDate,
          Email : sessionPart.Email,
          PhoneNumber : sessionPart.PhoneNumber,
          StartTime : sessionPart.StartTime,
          Present : sessionPart.Present,
        }
        this.membersService.MemberById(this.model).subscribe({
          next: student => {
            this.student = student;
          },
          error: err => this.errorMessage = err
        });
      }  */

    drop(event: CdkDragDrop<any[]>)
    {
        this.dragDisabled = true;
        moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    }

    UpdateOrder()
    {
        this.Studentarray = this.dataSource
        this.dataSource.forEach((element, i) => {
            let studentObj = {
                StudentId: element.Id,
                RecitationId: this.sessionId,
                StartTime: this.Times[i],
                CreatedOn: element.CreatedOn
            };

            this.sessionParticipantService.updateOrder(studentObj.StudentId, studentObj).subscribe({
                next: () => { this.getStudents() },
                error: err => console.log(err)
            });
        });
    }
}