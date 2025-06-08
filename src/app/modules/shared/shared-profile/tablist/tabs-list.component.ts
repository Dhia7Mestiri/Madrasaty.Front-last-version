import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-tabslist',
    templateUrl: './tabs-list.component.html',
    styleUrls: ['./tabs-list.component.scss'],
})
export class TabslistComponent implements OnInit {
    @Output() BtnNavigateClick = new EventEmitter();
    @Input() TabsList;
    constructor() {}

    ngOnInit(): void {
        console.log(this.TabsList);
    }

    onNavigateClick(tabIndex: number)
    {
        if (!tabIndex)
            return;

        this.BtnNavigateClick.emit(tabIndex);
    }
}