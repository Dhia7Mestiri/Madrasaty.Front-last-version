import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class CheckboxQuestion extends QuestionBase<boolean>
{
    override type = 'checkbox';
    checked       : boolean | undefined;

    constructor(options: IFormQuestion<boolean> = {})
    {
        super(options);
        this.type    = options.type || this.type;
        this.checked = options.value;
    }
}