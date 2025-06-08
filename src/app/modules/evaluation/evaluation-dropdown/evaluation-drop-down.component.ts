import { Component, OnInit,
         EventEmitter,
         HostBinding,
         Input, Output          } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector   : 'app-evaluation-drop-down',
    templateUrl: './evaluation-drop-down.component.html',
    styleUrls  : ['./evaluation-drop-down.component.scss']
})
export class EvaluationDropDownComponent implements OnInit
{
    FilterForm: FormGroup;
    @Input() FilterList: any;
    @Input() SurahList: any;
    @Output() btnClick = new EventEmitter();

    @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

    constructor(private formBuilder: FormBuilder)
    { }

    ngOnInit()
    {
        this.FilterForm = this.formBuilder.group({
            Poeme: [0],
            OrderBy: ['Rating'],
            action: '',
        });
    }

    Download()
    {

        this.FilterForm.get('action').setValue('download');
        this.btnClick.emit(this.FilterForm.value);
    }

    open()
    {
        this.FilterForm.get('action').setValue('open');
        this.btnClick.emit(this.FilterForm.value);

    }
}