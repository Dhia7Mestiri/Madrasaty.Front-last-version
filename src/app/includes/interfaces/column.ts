export interface IColumn
{
    type            : string;
    field           : string;
    header          : string;
    css            ?: string;
    icon           ?: string;
    sortable       ?: boolean;
    filter         ?: boolean;
    filterMatchMode?: string;
    width          ?: string;
    customizable   ?: boolean;
    title          ?: string;
    pipe           ?: any; 

}