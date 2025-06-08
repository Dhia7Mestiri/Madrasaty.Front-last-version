import { Page } from "../enums/page";

export interface IGridRow
{
    page   : Page;
    data   : any;
    button?: string;
}