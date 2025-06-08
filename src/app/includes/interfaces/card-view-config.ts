import { CardViewButton } from "./card-view-button";
import { CardViewEntry  } from "./card-view-entry";

export interface CardViewConfig
{
    toolbarCaption?: string;
    toolbarKey  ?: string;
    name          ?: string;
    url           ?: string;
    description   ?: string;
    content       ?: string;
    badge         ?: string;
    bodyAvatar    ?: string;

    info          ?: CardViewEntry[];
    users         ?: any[];
    buttons       ?: CardViewButton[];

    defaultAvatar ?: string;
    defBodyAvatar ?: string;
    defaultIcon   ?: string;
}