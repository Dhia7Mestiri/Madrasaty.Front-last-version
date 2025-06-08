import { Page             } from "../enums/page";
import { SaveButtonAction } from "../enums/save-button-action";

export interface ISaveButtonData
{
    page  : Page;
    action: SaveButtonAction;
}