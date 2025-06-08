import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Permission } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { Member } from '@models/member';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  @Input() member !: Member;
  permissions = [Permission.EditStudent];

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

     // this.listenToSaveButtonClick();
  }

  private grantedAccess() : boolean
  {
      return this.perm.allowedTo(this.permissions);
  }
  newMember(){
    this.questions = this.qService.MemberForm();
    this.form      = this.questionCtrl.toFormGroup(this.questions);
  }
  openModal(action : SaveButtonAction,Member? : Member)
  {
    if(action==SaveButtonAction.Edit ) 
      {
        this.member    = Member;
        this.questions = this.qService.MemberForm(this.member);
        this.form      = this.questionCtrl.toFormGroup(this.questions);
      }
      else {
        this.newMember()
      }
  }
  listenToSaveButtonClick(){
    
  }
}
