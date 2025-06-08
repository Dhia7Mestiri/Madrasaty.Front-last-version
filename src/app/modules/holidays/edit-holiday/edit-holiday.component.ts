import { Holiday } from '@models/holiday';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
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
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.scss']
})
export class EditHolidayComponent implements OnInit {
  @Input() holiday !: Holiday;
  permissions = [Permission.EditHoliday];

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

  AddEdit(holiday: Holiday)
  {
      this.holiday    = holiday;
      this.questions = this.qService.HolidayForm(this.holiday);
      this.form      = this.questionCtrl.toFormGroup(this.questions);
  }
  listenToSaveButtonClick()
  {
      this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
      {
        if (buttonData.page == Page.Holidays && buttonData.action == SaveButtonAction.Edit)
          {
            const data = {  ...this.holiday, ...this.form.value };             
        this.http.update<Holiday>(consts.VACANCES_URL+ data.Id,data)      
                          .subscribe({
                             next: () => { console.log("this.notification.showSuccess") },
                               error: err =>  console.log("this.notification.showSuccess 22")
                            });         

          } 
          if (buttonData.page == Page.Holidays && buttonData.action == SaveButtonAction.New){
            const data = {  ...this.holiday, ...this.form.value };  
            this.http.create<Holiday>(consts.VACANCES_URL,data)      
            .subscribe({
               next: () => { console.log("this.notification.showSuccess") },
                 error: err =>  console.log("this.notification.showSuccess 22")
              });         
          }
       
      });
  }
}
