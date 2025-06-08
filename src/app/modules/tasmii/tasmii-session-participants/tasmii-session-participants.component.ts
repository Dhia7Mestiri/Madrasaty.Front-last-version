import { Component, OnInit            } from '@angular/core';
import { ActivatedRoute               } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MembersListService           } from '@services/members/members-list.service';
import { SessionParticipantService    } from '@services/session-participants/session-participants.service';

@Component({
    selector   : 'app-session-participants',
    templateUrl: './tasmii-session-participants.component.html',
    styleUrls  : ['./tasmii-session-participants.component.scss']
})
export class TasmiiSessionParticipantsComponent implements OnInit
{
    sessionId;
    students;
    Times: any[]
    dataSource;
    dragDisabled = true;
    Studentarray: any[] = []
    currentSession: any;
    model: { StudentId: any; SessionId: any; FullName: any; BirthDate: any; Email: any; PhoneNumber: any; StartTime: any; Present: any; };
    student: import("d:/Madrasaty-net-7(Last Version)/Madrasaty.Front(last-version)/src/app/models/member").Member;
    errorMessage: any;

    constructor(private sessionParticipantService: SessionParticipantService,
        private memberService: MembersListService, private route: ActivatedRoute)
    { }

    ngOnInit()
    {
        const param = this.route.snapshot.paramMap.get('Id');
        if (param) { this.sessionId = param; };
        this.getStudents();
        this.sessionParticipantService.GetAllStartTime(this.sessionId).subscribe((data) => {
            this.Times = data;
            this.Times.sort((a, b) => this.hmsVal(a) - this.hmsVal(b));
        });
    }

    getStudents()
    {
        this.sessionParticipantService.GetStudents(this.sessionId).subscribe({
            next: participants => {
                this.students   = participants;
                this.dataSource = participants;
            },
            error: err => console.log(err)
        });
    }

    getmemberPhotos(Photopath)
    {
        return this.memberService.GetMemberPhotoPath(Photopath)
    }

       setStudentPresence(sessionPart){
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
        this.memberService.MemberById(this.model).subscribe({
          next: student => {
            this.student = student;
          },
          error: err => this.errorMessage = err
        });
      } 

    hmsVal(i)
    {
        const [, h, m, s] = i.match(/(\d\d):(\d\d):(\d\d)/);
        return Number(h) * 3600 + Number(m) * 60 + Number(s);
    }

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