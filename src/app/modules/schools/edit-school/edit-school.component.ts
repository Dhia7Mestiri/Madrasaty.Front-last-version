import { HttpService } from '@services/http-service/http.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { SaveButtonAction } from '@enums/save-button-action';
import { ISaveButtonData } from '@interfaces/save-button-data';
import { School } from '@models/school';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionBase } from '@services/questions/question-base';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import * as urlconsts from '@consts/url.consts';
import { formToSchool } from '@functions/form-to-school';
@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {

  @Input() school !: School;
  permissions = [Permission.EditCourse];

  questions: QuestionBase<any>[] = [];
  form     = new FormGroup({});
  subscription !: Subscription;
  Countries:any[]
  private destroy$ = new Subject();
  constructor(private questionCtrl: QuestionControlService, private qService: QuestionService,private http:HttpService,
      private perm: PermissionsService, private notif: NotificationService)
  { }

  ngOnInit()
  {
    this.http.read("assets/files/countries.json",false)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {

        const transformedArray = data.map(item => ({ key: item.name, value: item.code }));

        this.Countries = transformedArray;
    });

      if (!this.grantedAccess())
          return;

      this.listenToSaveButtonClick();
  }

  private grantedAccess() : boolean
  {
      return this.perm.allowedTo(this.permissions);
  }

  AddEdit(school: School)
  {
      this.school    = school;    
      this.questions = this.qService.editSchoolQuestions(this.school,this.Countries);
      this.form      = this.questionCtrl.toFormGroup(this.questions);
  }

  listenToSaveButtonClick() {
    this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) => {
      const data = formToSchool(this.form, this.school?.Id); 
      if (buttonData.page == Page.Schools && buttonData.action == SaveButtonAction.Edit) {
        this.http.update<School>(urlconsts.SCHOOL_URL + data.Id, data)
          .subscribe({
            next: () => {                                       
              this.notif.saveRow({
                page: Page.Schools,
                data: {...this.school,...data},                      
              });
            },
            error: (err) => {
              console.log("this.notification.showError");
              console.log(err);
             }
          });     
      }  
      if (buttonData.page == Page.Schools && buttonData.action == SaveButtonAction.New){
        const data ={...formToSchool(this.form, this.school?.Id)};  
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


