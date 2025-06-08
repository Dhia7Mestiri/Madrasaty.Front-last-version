import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class InputQuestion extends QuestionBase<string>
{
    override type = 'text';

    constructor(options: IFormQuestion<string> = {})
    {
        super(options);
        this.type = options.type || this.type;
    }
}