import { Component, Input, OnInit } from '@angular/core';
import { FormGroup                } from '@angular/forms';
import { QuestionBase             } from '@services/questions/question-base';

@Component({
    selector   : 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls  : ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit
{
    @Input()
    questions: QuestionBase<any>[] = [];
    @Input()
    form    !: FormGroup;

    constructor()
    { }

    ngOnInit()
    { }
}