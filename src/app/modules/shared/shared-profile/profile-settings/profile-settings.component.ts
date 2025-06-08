import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '@services/questions/question-base';



@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  @Input() profileForm : FormGroup;
  @Input() questions: QuestionBase<any>[] = [];
  @Output() BtnUpdateClick = new EventEmitter();
  clicked : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onUpdateClick()
  {
    this.clicked = true;
    this.BtnUpdateClick.emit();
  }


}
