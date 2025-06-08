import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tasmii } from '@models/Tasmii';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification/notification.service';
import { NotificationService as NT } from '@services/notification.service';
import { UserService } from '@services/user.service';
import * as consts from '@consts/url.consts';
import { MessageService } from 'primeng/api';
import { HistoriqueTasmiiSeanceComponent } from './historique-tasmii-seance/historique-tasmii-seance.component';
@Component({
  selector: 'app-tasmii',
  templateUrl: './tasmii.component.html',
  styleUrls: ['./tasmii.component.scss'],
  providers: [MessageService]
})
export class TasmiiComponent implements OnInit {

  @Input() SeanceData;
  @Input()StudentsBySeance=[]
  tasmiiForm:FormGroup
  SchoolIdUser:number
  selectedStudent
  selectedSurahFile
  surahList=[]
  tasmii:Tasmii
  tajwidErrorData=[]
 // saveButtonCaption = globalconsts.saveButtonCaption;
  tasmiiSeance
  maxAyah
  minAyah=1
  item
  display
  modalTitle
  subErrorsList=[]
  tajwidErrorArray: Array<any> = [];
  
fautes = [];
buttonPerClick = 10
Numnberofayahs
finalError=[]
tajwiderrorCodelist: Array<any> = [];
@ViewChild(HistoriqueTasmiiSeanceComponent) private HistoriqueTasmiiSeanceComponent: HistoriqueTasmiiSeanceComponent;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private notif: NT,
    private http: HttpService,private userservice:UserService,private notification :NotificationService) { }

  ngOnInit(): void {

    this.SchoolIdUser = this.userservice.getMemberSchoolId();
    this.http.read("assets/files/surahs.json",false).subscribe((data) => {this.surahList = data  })
    this.http.read("assets/files/TajwidError.json",false).subscribe((data) => {this.tajwidErrorData = data  })

this.initilizeForm()
this.detectSouratChanges()
this.updatePageTitle()
  }
  onSelectChange(event){
    this.selectedStudent=this.StudentsBySeance.find(x=>x.Id==event)
  }

  onSelectSurahChange(event){  
   
    this.changebuttonPerClick.setValue(true)
    this.selectedSurahFile=this.surahList.find(x=>x.number==event)  
    this.Numnberofayahs =  this.selectedSurahFile.numberOfAyahs
    this.maxAyah=  this.Numnberofayahs
   this.tasmiiForm.patchValue({
    VerseStart: 1,
    VerseEnd  :   this.Numnberofayahs
});   
  }

  initilizeForm(){

  this.tasmiiForm = this.formBuilder.group({
    Surah: [''],
    VerseStart: [],
    VerseEnd: [],
    Remarques: [''],
    Errors: [''],
    Rating: [0],
    StudentId: [this.selectedStudent?.Id],
    SeanceId: [this.SeanceData?.Id],
    TeacherId: [this.SeanceData?.TeacherId], 
    Date: [new Date()],
    changebuttonPerClick: [false]
});
}
private updatePageTitle()
{
  this.notif.updatePageTitle({
    title: "Tasmii",
    toggleView: false,
    orderBy: false,         
    breadcrumb: [
        { text: "Cours", url: '/courses' },
        { text: "Seances", url: '#' },
        { text: this.SeanceData?.Title, url: '/courses/' + this.SeanceData },     
        { text: "Séance de Tasmii", url: '' },      
    ],
    actionsBtn: [ ]
});
}

  displayTasmii(tasmii: Tasmii) {
    if (this.tasmiiForm) {
        this.tasmiiForm.reset();
    }  
    this.tasmiiSeance = tasmii;
    this.tasmiiForm.patchValue({
        Id: this.tasmiiSeance.Id,     
        TeacherId: this.tasmiiSeance.TeacherId,
        PoemId:this.tasmiiSeance.PoemId,           
        Rating: this.tasmiiSeance.Rating,
        Date: new Date(this.tasmiiSeance.Date),   
        VerseStart:this.tasmiiSeance.VerseStart,   
        VerseEnd:this.tasmiiSeance.VerseEnd,         
        Remarques: this.tasmiiSeance.Remarques,
        StudentId: this.tasmiiSeance.StudentId,
        SeanceId:  this.tasmiiSeance.SeanceId 
    });  
  }


  saveTasmii(){
    const tasmii = {...this.tasmii, ...this.tasmiiForm.value };
   
      this.http.create<Tasmii>(consts.TASMII_DETAIL_URL, tasmii).subscribe({
            next: (data) => {
                this.notification.showSuccess('moutoun ajouté avec succès'),
                this.initilizeForm(),
                this.HistoriqueTasmiiSeanceComponent.GetTasmiisBySeanceId()
            },
            error: (err) => {
                this.notification.showError('Problème lors de cette modification.')
                   this.displayTasmii(tasmii);
            },
        });  
  }

  ClickButtonOfTajwidError(item) {
    this.item=item
    this.display = true;   
    this.modalTitle = item.name;
    this.subErrorsList = item.children; 
}


GetFinalError($event){ 
  this.finalError=$event.data
  const data = {id:this.item.id,Data:this.finalError}
  this.tajwiderrorCodelist.push(data)
}

closeDialog() {
  this.display=false;
}


SaveTajwidErrors(){    
  
  this.tajwiderrorCodelist.forEach((element)  => {
    let tajwidError = { 
      id:  element.id,
      ErrorCodes:this.getchildrenCode(element.id, element.Data)
  }  
  this.tajwidErrorArray.push(tajwidError)
  });
  this.tasmiiForm.get('Errors').setValue(JSON.stringify( this.tajwidErrorArray))

this.messageService.add({severity:'info', summary: 'Info', detail: 'Les Fautes de Tajwid sont ajoutés avec succès'});
this.tajwidErrorData.map(item=>{
  item.length= this.tajwidErrorArray.find(x=>x.id==item.id)?.ErrorCodes.split(",").length
})

}
detectSouratChanges() { 
  this.tasmiiForm.valueChanges.subscribe(val => {   
    
      this.fautes = [],
          [...Array.from({ length: this.buttonPerClick>this.Numnberofayahs?this.Numnberofayahs:this.buttonPerClick }, (v, k) => k + this.ayahDebut.value)].forEach(element => {
              let faute = { id: element, cssclass: "btn btn-light-primary", clicked: false}
              this.fautes.push(faute);
          });    
      // if (!this.currentRecitationDetail?.Id){ return; }
  /*     this.evaluationDetailleService.getExistingLearningErrors(this.currentRecitationDetail?.Id).subscribe((data) => {
          if (!data[0]?.Wording) { return; }
          var array = data[0].Wording.split(",").map(Number)
          this.fautes.forEach(element => {
              var exists = array.includes(element.id) && this.currentRecitationDetail?.Id == data[0].RecitationDetailId
              if (exists) { element.cssclass = "btn btn-success", element.clicked = true }
          });
      }) */
  })
}

pushItem() {

  if (this.buttonPerClick < this.ayahFin.value) {
      console.log(this.buttonPerClick)
      this.buttonPerClick = this.buttonPerClick + 9;
      if (this.buttonPerClick > this.ayahFin.value) {
          this.buttonPerClick = this.ayahFin.value + 1 - this.ayahDebut.value
      }
      this.changebuttonPerClick.setValue(true)
  }
}
removeItem() {
  if (this.Numnberofayahs < 10) {
      this.buttonPerClick = this.Numnberofayahs;
  }
  
  else if (this.buttonPerClick > this.ayahDebut.value) {
      this.buttonPerClick = this.buttonPerClick - 9;
      if (this.buttonPerClick <= this.ayahDebut.value) {
          this.buttonPerClick = 10
      }
      this.changebuttonPerClick.setValue(true)
          }
          console.log(this.buttonPerClick)
}

get changebuttonPerClick() {
  return this.tasmiiForm.get('changebuttonPerClick');
}

get ayahDebut() {
  return this.tasmiiForm.get('VerseStart');
}
get ayahFin() {
  return this.tasmiiForm.get('VerseEnd');
}
getchildrenCode(id, array:[]) {
 let list: Array<any> = [];
  var target = this.tajwidErrorData.find(x => x.id == id)
  array.forEach(item=>{ 
    var Childcode = target.children.find(x => x.name === item).code   
    list.push(Childcode)
  })
  return list.join()
}

}

