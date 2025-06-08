import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';
import { KeyValue } from '@angular/common';
import { Seance } from '@models/Seance';
import { NotificationService } from '@services/notification.service';
@Component({
  selector: 'app-cour-session-profile',
  templateUrl: './cour-session-profile.component.html',
  styleUrls: ['./cour-session-profile.component.scss']
})
export class CourSessionProfileComponent implements OnInit {
  TabsList = [
    {
        title: 'Overview',
        href: '#kt_overview',
        id: '1',
        CssClass: 'nav-link text-active-primary pb-4 active',
    },
    {
        title: 'Settings',
        href: '#kt_settings',
        id: '2',
        CssClass: 'nav-link text-active-primary pb-4',
    },
    ,
    {
        title: 'Documents et Exercices',
        href: '#kt_Documents_Exercices',
        id: '3',
        CssClass: 'nav-link text-active-primary pb-4',
    },
    {
        title: 'Tasmii',
        href: '#kt_Tasmii',
        id: '4',
        CssClass: 'nav-link text-active-primary pb-4',
    },
    {
        title: 'Moutoun',
        href: '#kt_Moutoun',
        id: '5',
        CssClass: 'nav-link text-active-primary pb-4',
    }
];
selectedTab:number=1
activeSeance:number
routedata:Subscription
CourseSeanceId:number
SeanceDataTosend: KeyValue<string, any>[] = [];
ProfileDataTosend: KeyValue<string, any>[] = [];
SeanceData
StudentsBySeance=[]
Seance:Seance
src="/assets/media/illustrations/sketchy-1/2.png"
  constructor(
    private ActivetedRoute: ActivatedRoute,
    private http: HttpService,
    private notif: NotificationService

  ) { }

  ngOnInit(): void {
    this.routedata = this.ActivetedRoute.params.subscribe((params) => {
      this.CourseSeanceId = params['Id'];
  });

  
  this.http.read(consts.COURSE_URL + "StudentsByCourseId"+"?_pageNumber="+0+"&CourseId="+ this.CourseSeanceId,false).subscribe(data=>{
    this.StudentsBySeance=data
    });

  this.GetSeance()
  }
  private updatePageTitle()
  {
      this.notif.updatePageTitle({
          title: "Seance",
          toggleView: false,
          orderBy: false,         
          breadcrumb: [
              { text: "Cours", url: '/courses' },
              { text: "Seances", url: '#' },
              { text: this.SeanceData?.Title, url: '/courses/' + this.SeanceData },          
          ],
          actionsBtn: [ ]
      });
  }

  onClick(newTab: number)
  {
      this.selectedTab = newTab;
  }
  GetSeance(){
    this.http.read(consts.SEANCE_URL + this.CourseSeanceId,false).subscribe(data=>{     

      this.SeanceData=data 
      this.ProfileDataTosend.push(  
        { key: 'Enseignant', value: this.SeanceData?.Teacher?.FullName },
        { key: 'Skype ID', value: this.SeanceData?.Teacher?.SkypeId },
        { key: 'Email', value: this.SeanceData?.Teacher?.Email },
        { key: 'PhoneNumber', value: this.SeanceData?.Teacher?.PhoneNumber},
        { key: 'Address', value: this.SeanceData?.Teacher?.Street + " , " + this.SeanceData?.Teacher?.City + " , " +  this.SeanceData?.Teacher?.Country },
    );
      this.SeanceDataTosend.push(
        { key: 'Titre de Séance ', value: this.SeanceData?.Title },
        { key: 'Coure ', value: this.SeanceData?.Course?.Name },
        { key: 'Période', value: this.SeanceData?.Term?.Name },
        { key: 'Salle de Coure', value: this.SeanceData?.Classroom?.Name },
        { key: 'Date de début', value: this.SeanceData?.StartDate },
        { key: 'Duration', value: this.SeanceData?.Duration+" H" },
        { key: 'Enseignant', value: this.SeanceData?.Teacher?.FullName }
    );
    this.updatePageTitle()
    })
  }
}
