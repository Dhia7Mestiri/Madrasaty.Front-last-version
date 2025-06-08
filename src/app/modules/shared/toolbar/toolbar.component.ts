import { Component, OnInit,
         ChangeDetectorRef,   
         AfterViewChecked,
         OnDestroy           } from '@angular/core';
import { Title               } from '@angular/platform-browser';
import { Subscription,
         BehaviorSubject     } from 'rxjs';

import { IButton             } from '@interfaces/button';
import { IPage               } from '@interfaces/page';
import { NotificationService } from '@services/notification.service';

@Component({
    selector   : 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy
{
    pageTitle    : string;
    tableView    = localStorage.getItem('tableView') == '1' || false;
    toggleView$  = new BehaviorSubject<boolean>(false);
    showOrderBy$ = new BehaviorSubject<boolean>(false);
    navigationArr!: IButton[];
    actionButtons!: IButton[];
    private subscription!: Subscription;

    constructor(private title: Title, private notif: NotificationService, private cdr: ChangeDetectorRef)
    { }

    ngOnInit()
    {
        this.listenToPageChanges();
    }
   
    listenToPageChanges()
    {
        this.subscription = this.notif.pageChanged$.subscribe((activePage: IPage) => {
            this.setTitle(activePage)
        });
    }
    setTitle(newPage: IPage)
    {
        if (!newPage.title)
            return 
        this.pageTitle     = newPage.title;

        // this.badge      = newPage.badge ?? "";

        this.actionButtons = newPage.actionsBtn ?? [];
        this.navigationArr = newPage.breadcrumb ?? [];

        this.toggleView$.next(newPage.toggleView);
        this.showOrderBy$.next(newPage.orderBy);
        this.title.setTitle(newPage.title);

    }

    updateView(isTableView: boolean)
    {
        localStorage.setItem('tableView', isTableView ? '1' : '0');
        this.notif.updateView(isTableView);
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
        this.toggleView$?.unsubscribe();
    }
}