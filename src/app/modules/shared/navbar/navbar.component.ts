import { Component, OnDestroy, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@interfaces/user';
import { TranslateService    } from '@ngx-translate/core';

import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls  : ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy
{
    captions !: any[];
     userName : string ; 
     email : string ; 
     private subscriptions = new Subscription() ;
    role: string | string[];

    constructor(private notif: NotificationService, private translate: TranslateService,private route : Router, 
        private userService : UserService )
    { }

    ngOnInit()
    {
        this.getCaptions();
        this.listenToUserLogin() ; 
        this.onPageChange() ; 
    }
    onPageChange()
    {
       this.setLogin(this.userService.UserLoggedIn);

    }
    getCaptions()
    {
        this.translate.get([
            "general.title", "dashboard-index.statistiques"
        ]).subscribe((values: any[]) =>
        {
            this.captions = values;
        });
    }
    setLogin(login : IUser)
    {
        this.userName = login.userName ; 
        this.email = login.email
        this.role = login.role
    }
    updateDarkMode(newMode: number)
    {
        this.notif.updateDarkMode(newMode != 0);
    }
    listenToUserLogin()
    {
        this.subscriptions.add(this.notif.loginStatusChanged$.subscribe((login : IUser | null) => {
            if(login!=null)
                {
                    this.setLogin(login) ;
                }
            else {
                this.route.navigate(['auth/login'])
            }

        })
    )}
    signOut()
    {
      this.userService.logOut()
    }        
    ngOnDestroy()
    {
        this.subscriptions.unsubscribe()
    }
}