import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { ISaveButtonData } from '@interfaces/save-button-data';
import { Classroom } from '@models/classroom';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subscription } from 'rxjs';
import * as consts from '@consts/url.consts';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {
  @Input() classroom !: Classroom;
  permissions = [Permission.EditClassroom];

  questions: QuestionBase<any>[] = [];
  form     = new FormGroup({});
  subscription !: Subscription;

  constructor(private questionCtrl: QuestionControlService, private qService: QuestionService,private http: HttpService,
      private perm: PermissionsService, private notif: NotificationService)
  { }

  ngOnInit()
  {
      if (!this.grantedAccess())
          return;

      this.listenToSaveButtonClick();
  }

  private grantedAccess() : boolean
  {
      return this.perm.allowedTo(this.permissions);
  }
  newClassroom(){
    this.questions = this.qService.ClassroomForm();
    this.form      = this.questionCtrl.toFormGroup(this.questions);
  }
  openModal(action : SaveButtonAction,classroom? : Classroom)
  {
    if(action==SaveButtonAction.Edit ) 
      {
        this.classroom    = classroom;
        this.questions = this.qService.ClassroomForm(this.classroom);
        this.form      = this.questionCtrl.toFormGroup(this.questions);
      }
      else {
        this.newClassroom()
      }
  }
  listenToSaveButtonClick()
  {
      this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
      {
        if (buttonData.page == Page.Classrooms && buttonData.action == SaveButtonAction.Edit)
          {
            const data = {  ...this.classroom, ...this.form.value };  
         this.http.update<Classroom>(consts.CLASSROOM_URL+ data.Id,data)
      
                          .subscribe({
                             next: () => { console.log("this.notification.showSuccess") },
                               error: err =>  console.log("this.notification.showSuccess 22")
                            });          

          } 
       
      });
  }
}
