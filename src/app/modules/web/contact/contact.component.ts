import { Component, OnInit } from '@angular/core';
import { FormGroup         } from '@angular/forms';

import { QuestionBase           } from '@services/questions/question-base';
import { QuestionService        } from '@services/questions/question.service';
import { QuestionControlService } from '@services/questions/question-control.service';

@Component({
    selector   : 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls  : ['./contact.component.scss']
})
export class ContactComponent implements OnInit
{
    questions   : QuestionBase<any>[] = [];
    contactForm = new FormGroup({});
    loading     = false;
    success     = false;
    error       = '';

    constructor(private questionCtrl: QuestionControlService, private qService: QuestionService)
    { }

    ngOnInit()
    {
        this.questions   = this.qService.NewContactForm();
        this.contactForm = this.questionCtrl.toFormGroup(this.questions);
    }

    submit()
    {
        console.log(this.contactForm.value);
    }
}