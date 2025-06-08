import { Moutoun } from './../../../../models/Moutoun';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionService } from '@services/questions/question.service';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionBase } from '@services/questions/question-base';

@Component({
  selector: 'app-edit-moutoun',
  templateUrl: './edit-moutoun.component.html',
  styleUrls: ['./edit-moutoun.component.scss']
})
export class EditMoutounComponent implements OnInit {
  // @Input() StudentsBySeance;
  //@Input() PoemesList  
  @Input() moutoun !: Moutoun;
  questions: QuestionBase<any>[] = [];
  form     = new FormGroup({});
  constructor(private questionCtrl: QuestionControlService, private qService: QuestionService) { }
  ngOnInit(): void {
  }      
  edit(moutoun: Moutoun)
      {
          this.moutoun    = moutoun;  
          this.questions = this.qService.editMoutounQuestions(this.moutoun);
          this.form      = this.questionCtrl.toFormGroup(this.questions);
        
      }
  
}
