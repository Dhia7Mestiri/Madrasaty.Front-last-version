import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls  : ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit
{
    captions   !: any[];

    constructor(private translate: TranslateService)
    { }

    ngOnInit()
    {
        this.getCaptions();

     }

    getCaptions()
    {
        this.translate.get([
            "topbar.cours","topbar.calendrier","topbar.exercices","topbar.resultats","topbar.aide"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
        });
        
    }
}