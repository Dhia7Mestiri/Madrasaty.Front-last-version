import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from 'src/app/_metronic/layout';
import { environment } from 'src/environments/environment';
type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
    selector   : 'app-explore-main-drawer',
    templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent implements OnInit
{
    appPurchaseUrl ;
    appPreviewUrl ;

    activeTab: Tabs = 'Header';
    model: any;
    @ViewChild('form', { static: true }) form: NgForm;
    configLoading = false;
    resetLoading  = false;

    constructor(private layout: LayoutService)
    { }

    ngOnInit()
    {
        this.model = this.layout.getConfig();
    }

    setActiveTab(tab: Tabs) {
        this.activeTab = tab;
    }

    resetPreview()
    {
        this.resetLoading = true;
        this.layout.refreshConfigToDefault();
    }

    submitPreview()
    {
        this.configLoading = true;
        this.layout.setConfig(this.model);
        location.reload();
    }
}