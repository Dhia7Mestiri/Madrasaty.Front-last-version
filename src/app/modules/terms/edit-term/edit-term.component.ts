import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { ISaveButtonData } from '@interfaces/save-button-data';
import * as consts from '@consts/url.consts';
import { SchoolYear } from '@models/schoolyear';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-term',
  templateUrl: './edit-term.component.html',
  styleUrls: ['./edit-term.component.scss']
})
export class EditTermComponent implements OnInit {

  @Input() term !: SchoolYear;
  permissions = [Permission.EditTerm];

  questions: QuestionBase<any>[] = [];
  form     = new FormGroup({});
  subscription !: Subscription;


  @Output() 
  successEditCardEvent = new EventEmitter<any>();

 
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

  AddEdit(term: SchoolYear)
  {
      this.term    = term;
      this.questions = this.qService.TermForm(this.term);
      this.form      = this.questionCtrl.toFormGroup(this.questions);
  }
  listenToSaveButtonClick()
  {
      this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
      {
        if (buttonData.page == Page.Terms && buttonData.action == SaveButtonAction.Edit)
          {
            const data = {  ...this.term, ...this.form.value };       
        this.http.update<SchoolYear>(consts.SCHOOLYEAR_URL+ data.Id,data)
      
                          .subscribe({
                             next: () => { console.log("this.notification.showSuccess"),    this.notif.saveRow({
                              page: Page.Terms,
                              data: {...this.term,...data},                      
                            }); 

                            this.successEditCardEvent.emit(true);
                            this.successEditCardEvent.subscribe((value) => {
                            
                              // Handle the emitted value here
                            });},
                               error: err =>  console.log("this.notification.showSuccess 22")
                            });         

          } 
          if (buttonData.page == Page.Terms && buttonData.action == SaveButtonAction.New){
            const data = {  ...this.term, ...this.form.value };    
         this.http.create<any>(consts.SCHOOLYEAR_URL,data)      
            .subscribe({
               next: () => { console.log("this.notification.showSuccess"),this.notif.addRow({
                page: Page.Terms,
                data: {...this.term,...data},                      
              }) },
                 error: err =>  console.log("this.notification.showSuccess 22")
              });     
              console.log( this.form)   
          }
       
      });
  }
}
