import { Component, OnInit,
         Renderer2,           
         ViewEncapsulation   } from '@angular/core';
import { TranslateService    } from '@ngx-translate/core';

import { NotificationService } from '@services/notification.service';
import { ILanguage           } from '@interfaces/language';

import * as consts    from '@consts/global.consts';
import * as lngConsts from '@consts/language.consts';

@Component({
    selector     : '[app-navbar-language-dropdown]',
    templateUrl  : './navbar-language-dropdown.component.html',
    styleUrls    : ['./navbar-language-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarLanguageDropdownComponent implements OnInit
{
    activeLanguage: ILanguage = { src: consts.defaultLangFlag, name: consts.defaultLanguage, code: consts.defaultLangCode };
    languages: ILanguage[] = lngConsts.languages;

    private css !: any;

    constructor(private notif: NotificationService, private translate: TranslateService,
        private renderer: Renderer2)
    { }

    ngOnInit()
    {
        this.getActiveLanguage();

        if (this.activeLanguage.code != consts.defaultLangCode)
            this.updateHTML();
    }

    getActiveLanguage()
    {
        const language      = localStorage.getItem('language');
        this.activeLanguage = this.languages.find((lng: ILanguage) => lng.code === language) ?? this.activeLanguage;
    }

    changeLanguage(newLanguage: string)
    {
        this.activeLanguage = this.languages.find((language: ILanguage) => language.name === newLanguage);

        localStorage.setItem('language', this.activeLanguage.code);
        this.translate.use(this.activeLanguage.code);
        this.translate.setDefaultLang(this.activeLanguage.code);

        this.notif.updateLanguage(this.activeLanguage.code);

        this.updateHTML();
    }

    private updateHTML()
    {
        this.renderer.setAttribute(document.querySelector('html'), 'lang', this.activeLanguage.code);
        this.updateCSS();
    }

    updateCSS()
    {
        if (!this.useArabicCharacters())
        {
            if (this.css)
                this.renderer.setAttribute(this.css, 'disabled', '');

            return;
        }

        if (this.css)
        {
            this.renderer.removeAttribute(this.css, 'disabled');
            return;
        }

        this.css = this.renderer.createElement('link');
        this.renderer.setAttribute(this.css, 'rel', 'stylesheet');
        this.renderer.setAttribute(this.css, 'type', 'text/css');
        this.renderer.setAttribute(this.css, 'href', 'assets/css/amiri.css');

        this.renderer.appendChild(document.querySelector('head'), this.css);
    }

    useArabicCharacters(): boolean
    {
        return lngConsts.languageWithArabicCharacters.indexOf(this.activeLanguage.code) >= 0;
    }
}