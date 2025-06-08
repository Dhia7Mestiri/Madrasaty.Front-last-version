import { Component, OnInit } from '@angular/core';
import { UserService       } from '@services/user.service';
import { environment       } from 'src/environments/environment';

@Component({
    selector   : 'app-aside-menu',
    templateUrl: './aside-menu.component.html',
    styleUrls  : ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit
{
    appAngularVersion: string 
    appPreviewChangelogUrl: string
    currentUserId: any
    currentMemberStatutId: number

    constructor(private userService: UserService)
    { }

    ngOnInit()
    {
        this.currentMemberStatutId = this.userService.getMemberStatutId();
    }

    ngAfterViewInit()
    {
        this.currentUserId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
    }
}