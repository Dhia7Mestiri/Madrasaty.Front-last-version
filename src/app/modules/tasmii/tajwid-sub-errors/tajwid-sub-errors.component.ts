import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-tajwid-sub-errors',
  templateUrl: './tajwid-sub-errors.component.html',
  styleUrls: ['./tajwid-sub-errors.component.scss']
})
export class TajwidSubErrorsComponent implements OnInit {

  finalSubErrorsList: any[];
  Errors: any[]=[];
  @Input() display: boolean;
  @Input() modalTitle: string;
  @Input() subErrorsList: any[];
  @Output() SendfinalSubErrorsList = new EventEmitter();
  @Output() onDialogClose: EventEmitter<any> = new EventEmitter(); 

  constructor() { }
  
  ngOnInit() { }
  onButtonClick(btnClicked) {

    let itemToEdit = this.subErrorsList.find(item => item.name == btnClicked.name);  
    if (itemToEdit.clicked) {     
      itemToEdit.cssclass = "btn btn-primary dim" 
      itemToEdit.clicked = !itemToEdit.clicked     
    }
    else {
      itemToEdit.cssclass = "btn btn-danger"
      itemToEdit.clicked = !itemToEdit.clicked
      this.Errors.push(itemToEdit); 
    }  
  }
  saveSubErrors() {
    this.finalSubErrorsList = this.Errors.filter((a) => a.clicked == true).map(a => a.name); 
    this.SendfinalSubErrorsList.emit({data:this.finalSubErrorsList,end:true});  
    this.onDialogClose.emit(false);
    this.Errors=[]
  }

  closeDialog() {
    this.onDialogClose.emit(false);
  }

}
