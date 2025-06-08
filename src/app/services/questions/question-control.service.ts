import { Injectable    } from '@angular/core';
import { FormControl,
         FormGroup,
         Validators    } from '@angular/forms';
import { IFormQuestion } from '@interfaces/form-question';

@Injectable({
    providedIn: 'root'  // Provides service in AppModule
})
export class QuestionControlService
{
    private defaultValues = new Map<Function, any>([
        [Boolean, false],
        [Number, 0],
        [String, ''],
        [Array, []],
        [Object, {}],
    ]);

    constructor()
    { }

    toFormGroup(questions: IFormQuestion<any>[])  // QuestionBase<any>[])
    {
        const group: any = {};

        questions.forEach(question =>
        {
            // group[question.key!] = question.required ? new FormControl(question.value || '', Validators.required)
            //                                          : new FormControl(question.value || '');

            const defaultValue = this.defaultValues.get(question.value.constructor) || '';
            group[question.key!] = question.required ? new FormControl(question.value || defaultValue, Validators.required)
                                                     : new FormControl(question.value || defaultValue);
        });
        return new FormGroup(group);
    }
}