import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() teachersList;
  @Input() disciplinesList;
  @Input() courseForm: FormGroup;
  @Output() BtnUpdateClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onUpdatClick() { 
    this.BtnUpdateClick.emit();      
    }

}
