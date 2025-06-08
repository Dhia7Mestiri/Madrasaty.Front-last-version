import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Seance } from '@models/Seance';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';
import { NotificationService } from '@services/notification/notification.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() SeanceData;
  SeanceForm: FormGroup;
  Seance
  constructor(  private notification: NotificationService,   private http: HttpService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {  
    this.SeanceForm = this.formBuilder.group({
      Id: [],  
      TeacherId: [],
      StartDate: [''],
      TermId: [this.SeanceData?.Term?.Name],
      CourseId: [this.SeanceData?.Course?.Id],  
      Title: [], 
      Remarques: [''], 
      ClassroomId: [''], 
      Duration: [''], 
  });
  this.displaySeance(this.SeanceData)
  }
  UpdateSeance(){
    const Seance = { ...this.SeanceForm.value };
    Seance.Duration=`${String(Seance.Duration.getHours()).padStart(2, "0")}:${ String(Seance.Duration.getMinutes()).padStart(2, "0")}:${String(Seance.Duration.getSeconds()).padStart(2, "0")}`;
    console.log(Seance)
   this.http.update<Seance>(consts.SEANCE_URL + Seance.Id, Seance).subscribe({
        next: (data) => {
            this.notification.showSuccess('Seance modifiée avec succès'),  this.displaySeance(Seance)
        },
        error: (err) => {
            this.notification.showError(
                'Problème lors de cette modification.'
            ),
                this.displaySeance(this.SeanceData);
        },
    });  
  }

    displaySeance(seance: Seance) {
      if (this.SeanceForm) {
          this.SeanceForm.reset();
      }  
      this.Seance = seance;
      this.SeanceForm.patchValue({
          Id: this.Seance.Id,     
          TeacherId: this.Seance.TeacherId,
          TermId:this.Seance.TermId,           
          CourseId: this.Seance.CourseId,
          StartDate: new Date(this.Seance.StartDate),   
          Title:this.Seance.Title,          
          Remarques: this.Seance.Remarques,
          ClassroomId: this.Seance.ClassroomId,
          Duration:  new Date("1970-01-01T" + this.Seance.Duration )
      });     
    }
}
