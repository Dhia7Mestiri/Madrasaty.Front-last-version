import { KeyValue      } from '@angular/common';

import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class ListQuestion extends QuestionBase<string[]>
{
    override type = 'list';
    options: KeyValue<string, string>[] = [];

    constructor(options: IFormQuestion<string[]> = {})
    {
        super(options);

        this.type    = options.type    || this.type;
        this.options = options.options || [];
    }
}