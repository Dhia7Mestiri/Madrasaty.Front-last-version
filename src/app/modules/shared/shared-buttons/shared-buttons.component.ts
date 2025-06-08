import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector   : 'app-shared-buttons',
    templateUrl: './shared-buttons.component.html',
    styleUrls  : ['./shared-buttons.component.scss']
})
export class SharedButtonsComponent implements OnInit
{
    @Output() btnEditClick = new EventEmitter();
    @Output() btnDeleteClick = new EventEmitter();
    @Input() ismodified: boolean
    @Input() evaluationMode: boolean = false
    @Input() MoutounMode: boolean = false

    constructor()
    { }

    ngOnInit()
    { }

    onEditClick()
    {
        this.btnEditClick.emit();
    }

    onDeleteClick()
    {
        this.btnDeleteClick.emit();
    }
}