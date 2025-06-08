import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, Input, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService as NT} from '@services/notification.service';
import { ExamenNote } from '@models/examen-note';
import { NotificationService} from '@services/notification/notification.service';
import * as consts from '@consts/url.consts';
@Component({
  selector: 'app-examens-notes',
  templateUrl: './examens-notes.component.html',
  styleUrls: ['./examens-notes.component.scss']
})
export class ExamensNotesComponent implements OnInit {
examenNotesData
  @Input() ExamenData
  @ViewChild('modalCloseBtn') private modalCloseBtn: ElementRef;
  DialogTitle=""
  examenNote:ExamenNote
  ExamenNoteForm:FormGroup
  pagenumber=1
  StudentsByExamen=[]
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private notif: NT,
    private notification: NotificationService
    
  ) { }

  ngOnInit(): void {
    this.ExamenNoteForm = this.formBuilder.group({
      Note: [''],
      StudentId: [''],
      ExamenId: [''],
  });
  this.getNotesExamen(this.pagenumber,this.ExamenData?.Id)
   this.http.read(consts.EXAMENS_URL+"StudentsByExamenId"+"?ExamenId="+this.ExamenData?.Id,false ).subscribe((data) => {      
    this.StudentsByExamen=data
   }); 

   this.updatePageTitle()
  }


  private updatePageTitle()
  {
      this.notif.updatePageTitle({
          title: "Examen Note",
          toggleView: false,
          orderBy: false,         
          breadcrumb: [
            { text: "examens", url: '/examens' },      
            { text: this.ExamenData?.Name, url: '/examens/' + this.ExamenData },      
              { text: "Les notes", url: '#' },
          ],
          actionsBtn: [ ]
      });
  }
  
  updateExamenNote(){
    const examanNote = { ...this.examenNote, ...this.ExamenNoteForm.value }; 
    delete examanNote.Observation;
    delete examanNote.StudentFullName;
   this.http.update(consts.EXAMENS_NOTE_URL,examanNote)
    .subscribe({
        next: () => {this.notification.showSuccess("Votre Note Examen a été bien  modifié "),  this.getNotesExamen(this.pagenumber,this.ExamenData?.Id), this.modalCloseBtn.nativeElement.click() },
        error: err =>  {this.notification.showError('Please correct the validation errors.')}
    }); 

  }
/*   AddExamenNote(){
    const examanNote = { ...this.examenNote, ...this.ExamenNoteForm.value }; 
    delete examanNote.Observation;
    delete examanNote.StudentFullName;
    examanNote.ExamenId= this.ExamenId,     
   this.http.create(consts.EXAMENS_NOTE_URL,examanNote)
    .subscribe({
        next: () => {this.notification.showSuccess("Votre Note Examen a été bien  modifié "),  this.getNotesExamen(this.pagenumber,this.ExamenId), this.modalCloseBtn.nativeElement.click() },
        error: err =>  {this.notification.showError('Please correct the validation errors.')}
    }); 

  } */
  displayExamenNote(examenNote){
    if (this.ExamenNoteForm) {
      this.ExamenNoteForm.reset();
  }
  this.examenNote = examenNote;
  this.ExamenNoteForm.patchValue({
    ExamenId: this.examenNote.ExamenId,     
      StudentId: this.examenNote.StudentId,
      Note:this.examenNote.Note       
    });   
  }
   deleteExamenNote(item) {
        this.notification.deleteElementAlert().then((result) => {
        if (result.value && item.StudentId!=0 && item.ExamenId!=0) {
          this.http.delete(consts.EXAMENS_NOTE_URL+"?ExamenId="+ item.ExamenId+"&StudentId="+ item.StudentId)
            .subscribe({
              next: ()=> {this.notification.showSuccess("Votre  Note Examen a été bien supprimée"),   this.getNotesExamen(this.pagenumber,this.ExamenData?.Id)},
              error: err => this.notification.showError("Problème au cour de la suppression")
            });
          }   
      })
    } 

    OpenDiag(item) {   
      if (item == -1) {       
        this.ExamenNoteForm.controls.StudentId.enable();
    } else {
      this.ExamenNoteForm.controls.StudentId.disable();
    }
      this.DialogTitle = item === -1 ? 'Ajouter Note Examen ' : 'Modifier Note Examen';    
     this.displayExamenNote(item)      
     
    }
    paginate(event) { 
      this.pagenumber=event.page+1    
        this.getNotesExamen(this.pagenumber,this.ExamenData?.Id)     
   }
    getNotesExamen(pagenumber,ExamenId){
      this.http.read(consts.EXAMENS_NOTE_URL+ExamenId+"?_pageNumber="+pagenumber,false ).subscribe((data) => {      
        this.examenNotesData=data.Items
       });   
    }

}
