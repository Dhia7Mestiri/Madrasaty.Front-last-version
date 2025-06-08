import { Component, OnInit } from '@angular/core';
// import { BsModalRef        } from 'ngx-bootstrap/modal';

@Component({
    selector   : 'app-btn-update-delete',
    templateUrl: './btn-update-delete.component.html',
    styleUrls  : ['./btn-update-delete.component.scss']
})
export class BtnUpdateDeleteComponent implements OnInit
{
    data: any;
    params: any;
    // bsModalRef: BsModalRef;

    constructor()
    { }

    ngOnInit()
    { }

    agInit(params)
    {
        this.params = params;
        this.data = params.value;
    }

    editItem()
    {
        let id = this.data;
        this.params.context.componentParent.OpenDiag(id, true);
    }

    deleteItem()
    {
        let id = this.data;
        this.params.context.componentParent.deleteItem(id);
    }

    onEdit()
    {
        this.params.api.setFocusedCell(this.params.node.rowIndex, "Wording");
        this.params.api.startEditingCell({
            rowIndex: this.params.node.rowIndex,
            colKey: "Wording"
        });
    }
}