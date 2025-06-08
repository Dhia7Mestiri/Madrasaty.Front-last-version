import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector : 'app-card-view',
    template:''

})
export class CardViewStubComponent {
    @Output() btnClicked = new EventEmitter<any>();

}
