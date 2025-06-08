import { Component } from '@angular/core';

import * as urls from '@consts/url.consts';

@Component({
    selector   : 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    year   = new Date().getFullYear();
    domain = urls.PRETTY_DOMAIN;

    constructor()
    { }
}