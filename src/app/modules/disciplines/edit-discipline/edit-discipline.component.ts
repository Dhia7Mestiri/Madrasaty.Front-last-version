import { Discipline } from '@models/discipline';
import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '@enums/permission';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { SaveButtonAction } from '@enums/save-button-action';
import { ISaveButtonData } from '@interfaces/save-button-data';
import * as consts from '@consts/url.consts';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent implements OnInit {

  @Input() discipline !: Discipline;
  permissions = [Permission.EditDiscipline];

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

  edit(discipline: Discipline)
  {
      this.discipline    = discipline;
      this.questions = this.qService.DisciplineForm(this.discipline);
      this.form      = this.questionCtrl.toFormGroup(this.questions);
  }
  listenToSaveButtonClick()
  {
      this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
      {
        if (buttonData.page == Page.Disciplines && buttonData.action == SaveButtonAction.Edit)
          {
            const data = {  ...this.discipline, ...this.form.value };  
            console.log(data)
         this.http.update<Discipline>(consts.DISCIPLINE_URL+ data.Id,data)
      
                          .subscribe({
                             next: () => { console.log("this.notification.showSuccess") },
                               error: err =>  console.log("this.notification.showSuccess 22")
                            });        

          } 
       
      });
  }
}
