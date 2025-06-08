import { Component, Input, OnInit } from '@angular/core';
import { NotificationService as NT } from '@services/notification.service';

@Component({
  selector: 'app-documents-exercices',
  templateUrl: './documents-exercices.component.html',
  styleUrls: ['./documents-exercices.component.scss']
})
export class DocumentsExercicesComponent implements OnInit {
  @Input() SeanceData;
  constructor( private notif: NT) { }

  ngOnInit(): void {
    this.updatePageTitle()
  }
  private updatePageTitle()
  {
    this.notif.updatePageTitle({
      title: "Documents Et Exercices",
      toggleView: false,
      orderBy: false,         
      breadcrumb: [
          { text: "Cours", url: '/courses' },
          { text: "Seances", url: '#' },
          { text: this.SeanceData?.Title, url: '/courses/' + this.SeanceData },     
          { text: "Documents et Exercices", url: '' },      
      ],
      actionsBtn: [ ]
  });
  }
}
