import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector   : 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls  : ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit
{
    @Output() BtnOpenClick = new EventEmitter();
    @Output() DropDownSelectClick = new EventEmitter();
    @Input() IsDropDownExist = false;
    @Input() IsButtonExist = false;
    @Input() Terms = [];
    @Input() ButtonName;
    @Input() ToolBarName;
    @Input() CardHref;
    @Input() TableHref;
    @Input() ModalTarget;
    actualTearmId

    constructor()
    { }

    ngOnInit()
    { }

    onOpenClick(id)
    {
        this.BtnOpenClick.emit(id);
    }
    onSelectChange(arg)
    {
        this.DropDownSelectClick.emit(arg);
    }
}