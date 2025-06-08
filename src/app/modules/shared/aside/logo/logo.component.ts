import { Component, Input,
         OnInit            } from '@angular/core';
import { HttpService       } from '@services/http-service/http.service';
import { log               } from '@functions/log';

import * as urls   from '@consts/url.consts';

@Component({
    selector   : 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls  : ['./logo.component.scss']
})
export class LogoComponent implements OnInit
{
    @Input()
    schoolId   = 0;
    schoolLogo = "assets/media/logos/logo-dark-full.png";  // logo_ibn_jazar_login.png";
    loading    = false;
    logoCSS    = "loading";

    constructor(private http: HttpService)
    { }

    async ngOnInit()
    {
        await this.getSchoolLogo();
        this.listenToSidebarChange();
    }

    async getSchoolLogo()
    {
        this.loading = true;
        try
        {
            this.http.read(`${urls.LOGO_URL}${this.schoolId}.png`, false)
                .subscribe(
                {
                    next: (data: any) =>      // HttpResponse<any>
                    {
                        if (data)
                        {
                            this.schoolLogo = data;

                            log(`${urls.LOGO_URL}${this.schoolId}.png`);
                            log(data);
                        }
                        // else
                        // {
                        //     this.error = data ?? consts.DEFAULT_ERROR_MSG;
                        // }
    
                        this.loading   = false;
                        this.logoCSS   = "";
                    },
                    error: (error) =>
                    {
                        // this.showError(error);
                    }
                });
        }
        catch (error: any)
        {
            // this.showError(error);
        }
    }

    listenToSidebarChange()
    {
        document.getElementById("kt_app_sidebar_toggle").addEventListener("click", () =>
        {
            this.schoolLogo = "assets/media/logos/logo-dark" +
                (document.body.getAttribute("data-kt-app-sidebar-minimize") == "on" ? "-full" : "") + ".png";
        }, false);
    }
}