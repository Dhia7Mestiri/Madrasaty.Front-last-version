export interface IFormQuestion<T>
{
    id?          : string;
    value?       : T;
    key?         : string;
    label?       : string;
    required?    : boolean;
    order?       : number;
    type?        : string;
    rows?        : number;
    minLength?   : number;
    maxLength?   : number;
    options?     : any;
    visible?     : boolean;
    readOnly?    : boolean;
    placeholder? : string;
    showLabel?   : boolean;
    separator?   : boolean;
    step?        : number;
    checked?     : boolean;
    pattern?     : string;
    dependOn?    : string;
    showTime?    : boolean
    showSeconds? : boolean
    newRow?      : boolean;
    rowColumns?  : number;

    onChangeFn?  : (value: any) => any;
    validationFn?: (value: any) => boolean | string;
}