import { KeyValue      } from '@angular/common';

import { QuestionBase  } from './question-base';
import { IFormQuestion } from '@interfaces/form-question';

export class TagQuestion extends QuestionBase<string[]>
{
    override type = 'tag';
    options: KeyValue<string, string>[] = [];

    constructor(options: IFormQuestion<string[]> = {})
    {
        super(options);

        this.type    = options.type    || this.type;
        this.options = options.options || [];
    }
}