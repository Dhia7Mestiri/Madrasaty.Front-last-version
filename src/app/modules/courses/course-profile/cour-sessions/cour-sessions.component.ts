import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';
@Component({
  selector: 'app-cour-sessions',
  templateUrl: './cour-sessions.component.html',
  styleUrls: ['./cour-sessions.component.scss']
})
export class CourSessionsComponent implements OnInit {
  TabsList=   
   [
    {title:"Overview",href:"#kt_overview",id:"-1",CssClass:"nav-link text-active-primary pb-4 active"},
    {title:"Settings",href:"#kt_settings",id:"-1",CssClass:"nav-link text-active-primary pb-4"},
    {title:"Etudiants",href:"#kt_Etudiants",id:"1",CssClass:"nav-link text-active-primary pb-4"},
    {title:"Séance",href:"#kt_Séances",id:"2",CssClass:"nav-link text-active-primary pb-4"},
    {title:"Examens",href:"#kt_Examens",id:"3",CssClass:"nav-link text-active-primary pb-4"},
  ]
  DialogTitle
  @Input()  Course
  @Input()  TermId
  @Input()  terms
  @Input() teachersList

  @Output() seanceSelected = new EventEmitter<number>();

  SeanceForm: FormGroup;
  pagenumber=1
  SeancesByCourse;

  constructor(private formBuilder: FormBuilder,private http: HttpService) { }

  ngOnInit(): void {    

    this.SeanceForm = this.formBuilder.group({
      Id: [0],  
      TeacherId: [''],
      StartDate: [''],
      TermId: [''],
      CourseId: [this.Course?.Id],  
      Title: [''], 
      Remarques: [''], 
      Recurrence: [''], 
      Duration: [''], 
  });


  this.http.read(consts.SEANCE_URL +"SeancesByCourseId"+ "?CourseId=" + this.Course?.Id+"&_pageNumber=" + this.pagenumber,false).subscribe(data=>{  
    this.SeancesByCourse=data.Items
  })

  }
  OpenDiag(id){
    this.DialogTitle = id === -1 ? 'Ajouter Séance' : 'Modifier Séance';

  }
  saveSeance(){
    console.log( this.SeanceForm.value )
  }

  showSeance(seanceId: number)
  {
    this.seanceSelected.emit(seanceId);
    return false;
  }
}