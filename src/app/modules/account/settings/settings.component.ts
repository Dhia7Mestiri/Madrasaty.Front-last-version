import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
 
  fmemberData
  constructor(private activatedroute:ActivatedRoute) {    
  }

  ngOnInit(): void {  
  this.activatedroute.data.subscribe((result:{res:any})=>{
      this.fmemberData=result.res;  
     }
      )   
  }

  

  

}
