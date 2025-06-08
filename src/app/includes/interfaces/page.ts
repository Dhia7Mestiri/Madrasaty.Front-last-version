import { IButton } from "./button";

export interface IPage
{
    title?     : string;
    // sideMenu?: string;
    // badge?   : string;
    toggleView?: boolean;
    orderBy?   : boolean;
    breadcrumb?: IButton[];     // Navigation/breadcrumb
    actionsBtn?: IButton[];     // Right side buttons
}