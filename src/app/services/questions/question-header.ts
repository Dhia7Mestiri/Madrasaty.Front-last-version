import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class HeaderQuestion extends QuestionBase<number>
{
    override type  = 'header';
    override value = 3;     // Header size

    constructor(options: IFormQuestion<number> = {})
    {
        super(options);
        this.type = options.type || this.type;
    }
}