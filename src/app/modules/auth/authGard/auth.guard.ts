import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    constructor(private router: Router)
    { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if (localStorage.getItem('currentUser') != null)
            return true;

        this.router.navigate(['auth/login']);
        return false;
    }
}