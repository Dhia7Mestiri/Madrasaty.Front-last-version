import { Component, Input, OnInit,
         OnDestroy                     } from '@angular/core';
import { FormGroup, FormControl        } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IFormQuestion                 } from '@interfaces/form-question';

@Component({
    selector   : 'df-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls  : ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit, OnDestroy
{
    @Input() question !: IFormQuestion<any>;  // QuestionBase<any>;
    @Input() form     !: FormGroup;
    @Input() multiCols = false;

    hasFocus           = false;
    error              = "";
    crossValid$        = new BehaviorSubject<boolean>(true);
    crossValid         = true;
    subscriptions      : Subscription[] = [];

    ngOnInit()
    {
        this.subscribeToOtherField();
    }

    subscribeToOtherField()
    {
        if (!this.question?.dependOn || !this.question?.key)
            return;

        let control      = <FormControl>this.form.get(this.question.key!);
        let dependOnCtrl = <FormControl>this.form.get(this.question.dependOn);

        this.subscriptions.push(dependOnCtrl.valueChanges.subscribe(value =>
        {
            if (value)
                this.form.get(this.question.key!)!.disable();
            else
                this.form.get(this.question.key!)!.enable();
        }));

        if (!this.question?.validationFn)
            return;

        this.subscriptions.push(control.valueChanges.subscribe(value =>
        {
            if (!this.question?.validationFn)
                return;

            if (this.question.onChangeFn)
            {
                this.question.options = this.question.onChangeFn(control.value);  // this.form.controls[this.question.key].value);
            }

            if (this.question.validationFn(control.value))  // [control1.value, control2.value]))
            {
                this.crossValid$.next(true);
                this.crossValid = true;
            }
            else
            {
                this.crossValid$.next(false);
                this.crossValid = false;
            }
        }));
    }

    get isValid()
    {
        if (!this.question.key)
            return false;

        if (this.question.validationFn)
        {
            const valid = this.crossValid && this.question.validationFn(this.form.controls[this.question.key].value);
            if (typeof valid === "string")
            {
                this.error = valid.split("\n").join("<br />");
                return false;
            }

            return this.form.controls[this.question.key].valid && valid;
        }

        return this.form.controls[this.question.key].valid;
    }

    // onChange(event: Event, question: any)
    // {
    //     log("\n================================ ================================");
    //     log(event);
    //     log(question);

    //     if (this.question.onChangeFn)
    //     {
    //         if (!this.question.key)
    //             return;

    //         // this.question.options = 
    //         this.question.onChangeFn(this.form.controls[this.question.key].value);
    //     }
    // }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}