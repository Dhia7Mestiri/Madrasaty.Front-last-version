import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class DateTimeQuestion extends QuestionBase<Date>
{
    override type = 'datetime';

    constructor(options: IFormQuestion<Date> = {})
    {
        super(options);
        this.type = options.type || this.type;
    }
}