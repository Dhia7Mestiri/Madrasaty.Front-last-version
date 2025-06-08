import { PipeTransform } from "@angular/core";

export interface CardViewEntry
{
    key       : string;
    value     : string;
    pipe     ?: PipeTransform;
    pipeParam?: string;
    cssClass ?: string;
}