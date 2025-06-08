import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tajwid-errors',
  templateUrl: './tajwid-errors.component.html',
  styleUrls: ['./tajwid-errors.component.scss']
})
export class TajwidErrorsComponent implements OnInit {
  finalSubErrorsList: any[];
  Errors: any[]=[];
  @Input() display: boolean;
  @Input() tajwidErrorData
  @Input() modalTitle: string;
  @Input() subErrorsList: any[];
  @Output() SendfinalSubErrorsList = new EventEmitter();
  @Output() onDialogClose: EventEmitter<any> = new EventEmitter(); 
  @Output() BtnSaveTajwidErrors = new EventEmitter();
  @Output() BtnClickButtonOfTajwidError = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
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
    this.SendfinalSubErrorsList.emit({length:this.finalSubErrorsList.length,data:this.finalSubErrorsList,end:true});  
    this.onDialogClose.emit(false);
  
    this.Errors=[]
   
  }

  closeDialog() {
  this.onDialogClose.emit(false);
  }
  ClickButtonOfTajwidError(arg){
    this.BtnClickButtonOfTajwidError.emit(arg);
  }
  SaveTajwidErrors(){
    
    this.BtnSaveTajwidErrors.emit();
  }
}
