import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification/notification.service';
import * as consts from '@consts/url.consts';
import { Moutoun } from '@models/Moutoun';
import { EditMoutounComponent } from '../edit-moutoun/edit-moutoun.component';
import * as globalconsts from '@consts/global.consts';
@Component({
  selector: 'app-historique-moutoun-seance',
  templateUrl: './historique-moutoun-seance.component.html',
  styleUrls: ['./historique-moutoun-seance.component.scss']
})
export class HistoriqueMoutounSeanceComponent implements OnInit {
  @Input() SeanceId;
  @Input()StudentsBySeance
  MoutounsBySeanceId : any[]
  modalIsVisible=false
  modalTitle
  moutoun:Moutoun
  stars: number[] = [1, 2, 3, 4, 5];
  filteredData = [];
  @ViewChild('edit') editMoutounCmp !: EditMoutounComponent;
  constructor(private http: HttpService,private notification :NotificationService) { }

  ngOnInit(): void {
    this.GetMoutounsBySeanceId()
  }

  editMoutoun(row)
  {   
      this.moutoun         = row;
      this.modalTitle     = "Edition Moutoun - " + row.SeanceTitle;
      this.modalIsVisible = true;
      this.editMoutounCmp.edit(this.moutoun);
  }


  onSelectChange(selectedStudent){
    this.filteredData=[]
    if(selectedStudent==-1){
      this.filteredData =  this.MoutounsBySeanceId   
    } 
    else{  
    this.filteredData =  this.MoutounsBySeanceId.filter(x=>x.StudentId===parseInt(selectedStudent))
    }
  }
  DeleteMoutoun(MoutounId: number) {
    this.notification.deleteElementAlert().then((result) => {
        if (result && MoutounId != 0 ) {
           this.http.delete(consts.MOUTOUN_DETAIL_URL+MoutounId)
                .subscribe({
                    next: () => { this.notification.showSuccess("Ce moutoun a été bien supprimée"), this.GetMoutounsBySeanceId() },
                    error: err => this.notification.showError("Problème au cour de la suppression")
                });
        }
    })
  }

  GetMoutounsBySeanceId(){
    this.http.read(consts.MOUTOUN_DETAIL_URL + "MoutounsBySeanceId"+"?seanceId="+ this.SeanceId,false).subscribe(data=>{
      this.MoutounsBySeanceId=data
      this.filteredData=data
      });  
  }

}
