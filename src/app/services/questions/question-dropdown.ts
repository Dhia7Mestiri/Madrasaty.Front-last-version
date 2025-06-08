import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class DropdownQuestion extends QuestionBase<string>
{
    override type = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options: IFormQuestion<string> = {})
    {
        super(options);
        this.options = options.options || [];
    }
}