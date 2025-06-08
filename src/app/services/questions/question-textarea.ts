import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class TextAreaQuestion extends QuestionBase<string>
{
    override type = 'textarea';
    minLength: number;
    maxLength: number;
    rows     : number;

    constructor(options: IFormQuestion<string> = {})        // (options: {} = {})
    {
        super(options);

        this.rows      = options.rows      || 5;
        this.minLength = options.minLength || 0;
        this.maxLength = options.maxLength || 1000;
    }
}