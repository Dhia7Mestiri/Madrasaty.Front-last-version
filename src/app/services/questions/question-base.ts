import { IFormQuestion } from '@interfaces/form-question';

export class QuestionBase<T>
{
    id?          : string;
    value        : T;
    key          : string;
    label        : string;
    required     : boolean;
    order        : number;
    placeholder  : string;
    type         : string;
    cssClass?    : string;
    visible      : boolean;
    readOnly     : boolean;
    showLabel    : boolean;
    separator?   : boolean;
    step?        : number;
    pattern?     : string;
    dependOn?    : string;
    showTime?    : boolean
    showSeconds? : boolean

    newRow?      : boolean;
    rowColumns?  : number;
    onChangeFn?  : (value: any) => any;
    validationFn?: (value: any) => boolean | string;


    constructor(options: IFormQuestion<T> = {})
    {
        this.id           = options.id          || '';
        this.value        = options.value!;
        this.key          = options.key         || '';
        this.label        = options.label       || '';
        this.placeholder  = options.placeholder || '';
        this.type         = options.type        || '';
        this.pattern      = options.pattern     || '';
        this.dependOn     = options.dependOn    || '';
        this.required     = !!options.required;
        this.validationFn = options.validationFn;

        this.visible      = options.visible    === undefined ? true  : options.visible;
        this.readOnly     = options.readOnly   === undefined ? false : options.readOnly;
        this.showLabel    = options.showLabel  === undefined ? true  : options.showLabel;
        this.order        = options.order      === undefined ? 1     : options.order;

        this.separator    = options.separator  === undefined ? false : options.separator;
        this.step         = options.step       === undefined ? 1     : options.step;

        this.cssClass     = this.visible ? '' : 'd-none';

        this.newRow       = options.newRow     === undefined ? false : options.newRow;
        this.rowColumns   = options.rowColumns === undefined ? 1     : options.rowColumns;
    
        this.showTime     = options.showTime  === undefined ? false : options.showTime;
        this.showSeconds   = options.showSeconds  === undefined ? false : options.showSeconds;
    }
}