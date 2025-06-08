import { Component, OnInit,
         ChangeDetectorRef,
         Inject, ViewChild,
         OnDestroy           } from '@angular/core';
import { Subscription        } from 'rxjs';
import { DOCUMENT            } from '@angular/common';
import { Title               } from '@angular/platform-browser';
import { PrimeNGConfig       } from 'primeng/api';
import { TranslateService    } from '@ngx-translate/core';

import { NotificationService } from '@services/notification.service';

import { IMessage            } from '@interfaces/message';
import { IUser               } from '@interfaces/user';
import { IPage               } from '@interfaces/page';
// import { SaveButtonAction } from '@enums/save-button-action';
// import { Page             } from '@enums/page';

import { ErrorNotificationComponent   } from '@modules/shared/error-notification/error-notification.component';
import { SuccessNotificationComponent } from '@modules/shared/success-notification/success-notification.component';

import * as consts from '@consts/global.consts';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy
{
    @ViewChild(SuccessNotificationComponent)
    toastrOK    !: SuccessNotificationComponent;
    @ViewChild(ErrorNotificationComponent)
    toastrErr   !: ErrorNotificationComponent;

    appTitle     = consts.appTitle;
    pageTitle    = this.appTitle;
    useDarkMode  = localStorage.getItem('darkMode') == '1';
    isFluidUI    = localStorage.getItem('fluidUI')  == '1';
    subscriptions: Subscription[] = [];
    error       !: string;
    schoolId     = 0;

    // grid        !: Grid;
    // modalIsVisible    = false;
    // modalTitle        = consts.defaultModalTitle;
    // saveAction        = SaveButtonAction.None;
    // saveButtonCaption = consts.saveButtonCaption;

    constructor(private title: Title, private notif: NotificationService,
        @Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef,
        private translate: TranslateService, private primengConfig: PrimeNGConfig)
    { }

    ngOnInit()
    {
        this.setLanguage();
        this.listenToChanges();
        this.getCaptions();

        this.primengConfig.ripple = true;
    }

    getCaptions()
    {
        this.translate.get(["general.title"]).subscribe((values: any[]) =>
        {
            // this.captions = values;
            this.appTitle = values["general.title"];
        });
    }

    setLanguage()
    {
        this.translate.addLangs(consts.languages);

        let language = localStorage.getItem('language');

        if (!language)
        {
            language         = consts.defaultLangCode;
            const browserLng = this.translate.getBrowserLang();
            this.translate.use(browserLng.match(/ar|en|fr/) ? browserLng : language);
        }
        else
        {
            this.translate.use(language);
        }

        this.translate.setDefaultLang(language);
    }

    listenToChanges()
    {
        this.listenToLoginChanged();
        this.listenToPageChanges();
        this.listenToDarkModeChanges();
        this.listenToFluidityChanges();
        this.listenToErrorToastr();
    }

    ngAfterViewChecked()
    {
        this.setTitle(this.pageTitle);
        this.cdr.detectChanges();
    }

    setTitle(pageTitle: string)  // , badge?: string)
    {
        if (pageTitle && this.pageTitle == pageTitle)
            return;

        this.pageTitle = pageTitle;
        // this.badge  = badge ?? "";

        this.title.setTitle(pageTitle + ' - ' + this.appTitle);
    }

     listenToLoginChanged()
    {
        this.subscriptions.push(this.notif.loginStatusChanged$.subscribe((u: IUser | null) => {
            this.updatePermissions();
        }));
    }

    updatePermissions()
    {
        // this.canAddClients    = this.perm.allowedTo([Permission.AddClient]);
        // this.canEditClients   = this.perm.allowedTo([Permission.EditClient]);
        // this.canViewBotStatus = this.perm.allowedTo([Permission.ViewBotStatus]);

        // log('canAddClients',    this.canAddClients);
        // log('canEditClients',   this.canEditClients);
        // log('canViewBotStatus', this.canViewBotStatus);
    }

    listenToErrorToastr()
    {
        this.subscriptions.push(this.notif.onNewToastr$.subscribe((message: IMessage) =>
        {
            if (message.isError)
                this.toastrErr.show(message.content);
            else
                this.toastrOK.show(message.content);
        }));
    }
   
    listenToPageChanges()
    {
        // Update activePage, if/when asked to:
        this.subscriptions.push(this.notif.pageChanged$.subscribe(
            (activePage: IPage) => this.setTitle(activePage.title ?? this.appTitle)  // , activePage.badge);
        ));
    }

    listenToFluidityChanges()
    {
        this.subscriptions.push(this.notif.fluidityChanged$.subscribe(
            (isFluidUI: boolean) =>
            {
                this.isFluidUI = isFluidUI;
                localStorage.setItem('fluidUI', isFluidUI ? '1' : '0');

                // TODO: Save mode to user options (in DB)
            }));
    }

    setDarkLightMode()
    {
        // let cssFile = this.useDarkMode ? "dark." : "";

        // this.document.getElementById('plugins-bundle')?.setAttribute('href', "assets/plugins/global/plugins." + cssFile + "bundle.css?" + Date.now());
        // this.document.getElementById('style-bundle'  )?.setAttribute('href', "assets/css/style."              + cssFile + "bundle.css?" + Date.now());

        // if (this.useDarkMode)
        //     this.document.body.classList.add('dark-skin');
        // else
        //     this.document.body.classList.remove('dark-skin');

        this.document.getElementById(this.useDarkMode ? "dark"  : "light")?.removeAttribute('disabled');
        this.document.getElementById(this.useDarkMode ? "light" : "dark")?.setAttribute('disabled', 'true');
    
        this.saveDarkModeSettings();
    }

    saveDarkModeSettings()
    {
        localStorage.setItem('darkMode', this.useDarkMode ? '1' : '0');
    }

    listenToDarkModeChanges()
    {
        // Update light/dark mode, if/when asked to:
        this.subscriptions.push(this.notif.darkModeChanged$.subscribe(
            (isDarkMode: boolean) =>
            {
                this.useDarkMode = isDarkMode;
                this.setDarkLightMode();

                // TODO: Save mode to user options (in DB)
            }));
    }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}