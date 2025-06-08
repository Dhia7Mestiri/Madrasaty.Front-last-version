import { Injectable     } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams     } from '@angular/common/http';
import { Router         } from '@angular/router';

import { getAccessToken } from '@functions/access-token';
import { getCurrentUser } from '@functions/current-user';

import * as consts from '@consts/url.consts';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { log } from '@functions/log';
import { IUser } from '@interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private isUserLoggedIn = false;
    currentMemberId: number;
    memberData: any;
    currentUser: any;
    userdata: string;
    user : IUser | undefined = undefined;
    httpOptions: any;

    constructor(private httpclient: HttpClient, private router: Router)
    {
        this.httpOptions = getAccessToken();
    }

    set UserLoggedIn(user : IUser)
    {
        this.isUserLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.user = user 

    }

    get UserLoggedIn()
    {
        //return this.isUserLoggedIn;

        return this.user || JSON.parse(localStorage.getItem('currentUser')) ; 
    }
  
    /*public getUserToken(loginData)
    {
        this.userdata = "username=" + loginData.email + "&password=" + loginData.password + "&grant_type=password";
        log(this.userdata);
        if(environment.production)
            {
               return this.httpclient.post(consts.LOGIN_URL, this.userdata, { withCredentials: true, headers: this.httpOptions })
                .pipe(tap(response => {
                    this.UserLoggedIn = response as IUser; 
                }))

            }        
      this.UserLoggedIn = {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "userName": "johndoe",
            "email": "johndoe@example.com",
            "role": "admin"
          };
          return of(this.UserLoggedIn)


    }*/
public getUserToken(loginData: { email: string, password: string }) {
    const body = new HttpParams()
        .set('username', loginData.email)
        .set('password', loginData.password)
        .set('grant_type', 'password');

    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpclient.post(consts.LOGIN_URL, body.toString(), { headers }).pipe(
        tap((response: any) => {
            this.UserLoggedIn = response as IUser;
            console.log("User Logged In : ",this.UserLoggedIn)
        })
    );
    
}


    logOut()
    {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        this.httpclient.post(consts.ACCOUNT_URL + "Logout", { withCredentials: true, headers: this.httpOptions }).subscribe({
            next: respo => { console.log("DONE Logout") },
            error: err => console.log("Error Logout")
        })
    }
    getMemberStatutId()
    {
        this.currentUser = getCurrentUser();
        return this.currentUser ? JSON.parse(this.currentUser).status: 0;
    }

    getMemberSchoolId()
    {
        this.currentUser = getCurrentUser();  
        return this.currentUser?.schoolId??  0;
    }

    getMemberId()
    {
        this.currentUser = getCurrentUser();
        //return this.currentUser ? JSON.parse(this.currentUser).id: 0;
        return this.currentUser?.id ?? 0 ;

    }
}