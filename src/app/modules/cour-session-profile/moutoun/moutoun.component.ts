import { Moutoun } from '@models/Moutoun';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';
import { UserService } from '@services/user.service';
import { NotificationService } from '@services/notification/notification.service';
import { NotificationService as NT } from '@services/notification.service';
import { HistoriqueMoutounSeanceComponent } from './historique-moutoun-seance/historique-moutoun-seance.component';

@Component({
  selector: 'app-moutoun',
  templateUrl: './moutoun.component.html',
  styleUrls: ['./moutoun.component.scss']
})
export class MoutounComponent implements OnInit {

  @Input() SeanceData;
  @Input()StudentsBySeance=[]
  moutounForm:FormGroup
  PoemesList=[]
  SchoolIdUser:number
  selectedStudent:any
  selectedMoutounFile:any
  moutoun:Moutoun
  moutounSeance:any

  @ViewChild(HistoriqueMoutounSeanceComponent) private HistoriqueMoutounSeanceComponent: HistoriqueMoutounSeanceComponent;

  constructor(private formBuilder: FormBuilder,
    private http: HttpService,private userservice:UserService,private notification :NotificationService, private notif: NT) { }

  ngOnInit(): void {
    this.SchoolIdUser = this.userservice.getMemberSchoolId();
      this.http.read(consts.MOUTOUN_DETAIL_URL + "MoutounPoemes"+"?SchoolId="+ this.SchoolIdUser,false).subscribe(data=>{
        this.PoemesList=data
        });
   this.initilizeForm() 
   this.updatePageTitle()
  }

  initilizeForm(){
    this.moutounForm = this.formBuilder.group({
      PoemId: [''],
      VerseStart: [],
      VerseEnd: [],
      Remarques: [''],
      Rating: [0],
      StudentId: [this.selectedStudent?.Id],
      SeanceId: [this.SeanceData?.Id],
      TeacherId: [this.SeanceData?.TeacherId], 
      Date: [new Date()]
  });
  }
  private updatePageTitle()
  {
    this.notif.updatePageTitle({
      title: "Moutoun",
      toggleView: false,
      orderBy: false,         
      breadcrumb: [
          { text: "Cours", url: '/courses' },
          { text: "Seances", url: '#' },
          { text: this.SeanceData?.Title, url: '/courses/' + this.SeanceData },     
          { text: "Séance de Moutoun", url: '' },      
      ],
      actionsBtn: [ ]
  });
  }
  onSelectStudentChange(event){
    this.initilizeForm()
    this.selectedStudent=this.StudentsBySeance.find(x=>x.Id==event)
  }
  onSelectPoemeChange(event){  
    this.selectedMoutounFile=this.PoemesList.find(x=>x.Id==event)

  }

  saveMoutoun(){
    const moutoun = {...this.moutoun, ...this.moutounForm.value };
    console.log( moutoun)
       this.http.create<Moutoun>(consts.MOUTOUN_DETAIL_URL, moutoun).subscribe({
            next: (data) => {
                this.notification.showSuccess('moutoun ajouté avec succès'),   
                this.initilizeForm(),
                this.HistoriqueMoutounSeanceComponent.GetMoutounsBySeanceId()
            },
            error: (err) => {
                this.notification.showError('Problème lors de cette modification.')
                   this.displayMoutoun(moutoun);
            },
        }); 

  }

  displayMoutoun(moutoun: Moutoun) {
    if (this.moutounForm) {
        this.moutounForm.reset();
    }  
    this.moutounSeance = moutoun;
    this.moutounForm.patchValue({
        Id: this.moutounSeance.Id,     
        TeacherId: this.moutounSeance.TeacherId,
        PoemId:this.moutounSeance.PoemId,           
        Rating: this.moutounSeance.Rating,
        Date: new Date(this.moutounSeance.Date),   
        VerseStart:this.moutounSeance.VerseStart,   
        VerseEnd:this.moutounSeance.VerseEnd,         
        Remarques: this.moutounSeance.Remarques,
        StudentId: this.moutounSeance.StudentId,
        SeanceId:  this.moutounSeance.SeanceId 
    });    
  }
}

