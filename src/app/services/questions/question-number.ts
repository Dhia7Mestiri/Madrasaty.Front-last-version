import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class NumberQuestion extends QuestionBase<number>
{
    override type = 'number';

    constructor(options: IFormQuestion<number> = {})
    {
        super(options);
        this.type = options.type || this.type;
    }
}