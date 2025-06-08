import { SchoolyearService } from '@services/schoolyear/schoolyear.service';
import { FormGroup } from '@angular/forms';
import { ExamensService } from 'src/app/services/Examens/examens.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { UserType } from 'src/app/models/UserType';
import { Examen } from 'src/app/models/examen';
import { UserService } from '@services/user.service';
import { NotificationService } from '@services/notification/notification.service';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService as NT } from '@services/notification.service';
@Component({
  selector: 'app-examen-profile',
  templateUrl: './examen-profile.component.html',
  styleUrls: ['./examen-profile.component.scss']
})
export class ExamenProfileComponent implements OnInit {
  routedata
  ExamenId
  examenData
  examenNotesData
  ExamenForm:FormGroup
  examenDataTosend : KeyValue<string, any>[] = [];
  ProfileDataTosend: KeyValue<string, any>[] = [];
  selectedTab
  MemberStatusId  
  examen:Examen
  SchoolIdUser
  terms
  pagenumber=1
  src="/assets/media/illustrations/sketchy-1/4.png"
  TabsList=   
   [
    {title:"Overview",href:"#kt_overview",id:"-1",CssClass:"nav-link text-active-primary pb-4 active"},
    {title:"Settings",href:"#kt_settings",id:"0",CssClass:"nav-link text-active-primary pb-4"},
    {title:"Notes d'examen",href:"#kt_Examen_Note",id:"1",CssClass:"nav-link text-active-primary pb-4"},
 
  ]
  constructor(
    private ActivetedRoute :ActivatedRoute,
    private notif: NT,
    private examenService:ExamensService,
    private userservice:UserService,
    private notification:NotificationService,
    private schoolyearService:SchoolyearService) { }

  ngOnInit(): void {
    this.SchoolIdUser=this.userservice.getMemberSchoolId()
    this.ExamenForm = this.examenService.createExamenForm()
    this.routedata= this.ActivetedRoute.params.subscribe(params => { 
      this.ExamenId=params['Id']
      });
      this.MemberStatusId =Object.keys(UserType).map(key => ({ label:key , value:UserType[key]  }));
      this.examenService.getExamenById(this.ExamenId).subscribe(data=>{
        this.examenData = data;    
  this.updatePageTitle()

        this.examenDataTosend.push(
          {key: "Name", value: data.Name},
          {key: "Coefficient", value: data.Coefficient},     
          {key: "Start Date", value: data.StartDate},
          {key: "End Date", value: data.EndDate},   
          {key: "Term", value:data['Term'].Name},    
          {key: "Enseignant", value: data['Supervisor'].FullName},  
        );         
        
        this.ProfileDataTosend.push(  
          { key: 'Enseignant', value: this.examenData?.Supervisor?.FullName },
          { key: 'Skype ID', value: this.examenData?.Supervisor?.SkypeId },
          { key: 'Email', value: this.examenData?.Supervisor?.Email },
          { key: 'PhoneNumber', value: this.examenData?.Supervisor?.PhoneNumber},
          { key: 'Address', value: this.examenData?.Supervisor?.Street + " , " + this.examenData?.Supervisor?.City + " , " +  this.examenData?.Supervisor?.Country },
      )
        this.displayExamen( this.examenData)
      })
      this.schoolyearService.getSchoolYearsForExamens(this.SchoolIdUser).subscribe((data) => {      
        this.terms = data    
      }) 
  }


  findRole(value){
    return this.MemberStatusId.find(x=>x.value==value)?.label
   }
   
   onClick(arg) {
    this.selectedTab=arg  
  }

  private updatePageTitle()
  {
      this.notif.updatePageTitle({
          title: "Examen",
          toggleView: false,
          orderBy: false,         
          breadcrumb: [
              { text: "examens", url: '/examens' },      
              { text: this.examenData?.Name, url: '/examens/' + this.examenData },          
          ],
          actionsBtn: [ ]
      });
  }

 displayExamen(examen: Examen): void {
  if (this.ExamenForm) {
      this.ExamenForm.reset();
  }
  this.examen = examen;
  this.ExamenForm.patchValue({
      Id: this.examen.Id,     
      Name: this.examen.Name,
      IsDeleted:this.examen.IsDeleted,           
      SupervisorId: this.examen.SupervisorId,
      StartDate: new Date(this.examen.StartDate),
      EndDate: new Date(this.examen.EndDate),
      TermId:this.examen.TermId,          
      CourseId: this.examen.CourseId,
      Coefficient: this.examen.Coefficient
  })
}
UpdateExamen(){
  const examan = { ...this.examen, ...this.ExamenForm.value }; 
  this.examenService.updateExamen(examan)
  .subscribe({
      next: (data) => {this.notification.showSuccess("Votre Examen a été bien  modifié ") },
      error: err =>  {this.notification.showError('Please correct the validation errors.'), this.displayExamen(this.examenData)}
  }); 
}


}