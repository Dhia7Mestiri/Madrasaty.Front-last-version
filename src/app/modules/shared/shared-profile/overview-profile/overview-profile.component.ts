import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-overview-profile',
  templateUrl: './overview-profile.component.html',
  styleUrls: ['./overview-profile.component.scss']
})
export class OverviewProfileComponent implements OnInit {

  constructor() { }
  @Input() Data;
  ngOnInit(): void { 
  }
}