import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification/notification.service';
import * as consts from '@consts/url.consts';
@Component({
  selector: 'app-historique-tasmii-seance',
  templateUrl: './historique-tasmii-seance.component.html',
  styleUrls: ['./historique-tasmii-seance.component.scss']
})
export class HistoriqueTasmiiSeanceComponent implements OnInit {
  @Input() SeanceId;
  @Input() surahList
  @Input()StudentsBySeance
  TasmiisBySeanceId=[]
  filteredData = [];
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(private notification :NotificationService,private http: HttpService) { }

  ngOnInit(): void {
    this.GetTasmiisBySeanceId()
  }
  DeleteTasmii(TasmiiId: number) {
    this.notification.deleteElementAlert().then((result) => {
        if (result && TasmiiId != 0 ) {
           this.http.delete(consts.MOUTOUN_DETAIL_URL+TasmiiId)
                .subscribe({
                    next: () => { this.notification.showSuccess("Ce tasmii a été bien supprimée"), this.GetTasmiisBySeanceId() },
                    error: err => this.notification.showError("Problème au cour de la suppression")
                });
        }
    })
  }

  GetTasmiisBySeanceId(){
    this.http.read(consts.TASMII_DETAIL_URL + "TasmiiBySeanceId"+"?seanceId="+ this.SeanceId,false).subscribe(data=>{
      data.map(item=>{
        var surah = this.surahList.find(x=>x.number==item.Surah)
        item.SurahName= surah?.name +" - "+surah?.englishName
      })
      this.TasmiisBySeanceId=data   
      this.filteredData=data
      });
  
  }
  onSelectChange(selectedStudent){
    this.filteredData=[]
    if(selectedStudent==-1){
      this.filteredData =  this.TasmiisBySeanceId   
    } 
    else{  
      this.filteredData =  this.TasmiisBySeanceId.filter(x=>x.StudentId===parseInt(selectedStudent))
    }
  }
}
