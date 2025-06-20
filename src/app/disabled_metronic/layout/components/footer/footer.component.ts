import { Component, OnInit } from '@angular/core';
import { LayoutService     } from '../../core/layout.service';

@Component({
    selector   : 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss'],
})
export class FooterComponent implements OnInit
{
    footerContainerCssClasses = '';
    year = new Date().getFullYear();

    constructor(private layout: LayoutService)
    { }

    ngOnInit()
    {
        this.footerContainerCssClasses = this.layout.getStringCSSClasses('footerContainer');
    }
}