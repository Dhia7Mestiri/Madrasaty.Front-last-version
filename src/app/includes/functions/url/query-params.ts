import { ActivatedRoute } from "@angular/router";

export function getQueryParam(activatedRoute: ActivatedRoute, paramIndex: number) : string
{
    return activatedRoute.snapshot.url.length == 0 ? '' :
           activatedRoute.snapshot.url[paramIndex ?? 1].path;
}