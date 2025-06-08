import { Examen } from '@models/examen';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { ISaveButtonData } from '@interfaces/save-button-data';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subscription } from 'rxjs';
import * as consts from '@consts/url.consts';
import { formToExamen } from '@functions/form-to-examen';


@Component({
  selector: 'app-edit-examen',
  templateUrl: './edit-examen.component.html',
  styleUrls: ['./edit-examen.component.scss']
})
export class EditExamenComponent implements OnInit {
  @Input() examen !: Examen;
  permissions = [Permission.EditExam];
  questions: QuestionBase<any>[] = [];
  form     = new FormGroup({});
  subscription !: Subscription;
  constructor(
    private questionCtrl: QuestionControlService, 
    private qService: QuestionService,
    private http: HttpService,
    private perm: PermissionsService,
    private notif: NotificationService)
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

  AddEdit(examen: Examen)
  {    
     console.log(examen);
      this.examen    = examen;
      this.questions = this.qService.ExamenForm(this.examen);
      this.form      = this.questionCtrl.toFormGroup(this.questions);
   
  }
  listenToSaveButtonClick() {
    this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) => {
      const data = formToExamen(this.form, this.examen?.Id); 
      console.log(data);
      if (buttonData.page == Page.Examens && buttonData.action == SaveButtonAction.Edit) {
        this.http.update<Examen>(consts.EXAMENS_URL + data.Id, data)
          .subscribe({
            next: () => {                                       
              this.notif.saveRow({
                page: Page.Examens,
                data: {...this.examen,...data},                      
              });
            },
            error: (err) => {
              console.log("this.notification.showError");
              console.log(err);
             }
          });     
      }  
      if (buttonData.page == Page.Examens && buttonData.action == SaveButtonAction.New){
        const data ={...formToExamen(this.form, this.examen?.Id)};  
      /*   this.http.create<Examen>(consts.EXAMENS_URL,data)      
        .subscribe({
           next: () => { console.log("this.notification.showSuccess") },
             error: err =>  console.log("this.notification.showSuccess 22")
          });     */  
          console.log( this.form)   
      }else{
        console.log("hi")
      }
    });
  }
  
  



}