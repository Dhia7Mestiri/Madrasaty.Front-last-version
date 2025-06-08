
import { Observable             } from 'rxjs';
import { Injectable             } from '@angular/core';
import { Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { MembersListService     } from './members/members-list.service';
import { getCurrentUser } from '@functions/current-user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AppResolverService implements Resolve<any>
{
    currentMemberId: number;
    connectedMember: any;

    constructor(public memberService: MembersListService,private userservice : UserService)
    {
        const userId  = this.userservice.getMemberId();  // JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
        this.currentMemberId = userId ? userId: 0;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.connectedMember = this.memberService.getMember(this.currentMemberId);
        return this.memberService.getMember(this.currentMemberId);
    }
}
