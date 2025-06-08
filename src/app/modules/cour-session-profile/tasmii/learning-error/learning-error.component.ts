import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-learning-error',
  templateUrl: './learning-error.component.html',
  styleUrls: ['./learning-error.component.scss']
})
export class LearningErrorComponent implements OnInit {
  @Input() fautes;
  @Output() BtnRemoveItem = new EventEmitter();
  @Output() BtnPushItem = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  RemoveItem() {
    this.BtnRemoveItem.emit();
    }
    
    PushItem() {
    this.BtnPushItem.emit();
    }
}
