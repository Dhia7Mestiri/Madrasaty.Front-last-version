import { Component, Input,
         OnDestroy, OnInit,
         ChangeDetectorRef  } from '@angular/core';
import { BehaviorSubject,
         Subscription       } from 'rxjs';

import { MembersListService } from '@services/members/members-list.service';
import { Member             } from '@models/member';

@Component({
    selector: 'app-sign-in-method',
    templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy
{
    showChangeEmailForm = false;
    showChangePasswordForm = false;
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
    userEmail: any
    private unsubscribe: Subscription[] = [];
    @Input() ExpectedProp: Member;
    constructor(private cdr: ChangeDetectorRef, private Membersservice: MembersListService)
    { }

    ngOnInit()
    {
        this.unsubscribe.push(this.isLoading$
            // .asObservable()
            .subscribe((res) => (this.isLoading = res))
        );

        this.userEmail = this.ExpectedProp.Email, console.log("sign" + this.userEmail);
    }

    toggleEmailForm(show: boolean)
    {
        this.showChangeEmailForm = show;
    }

    saveEmail()
    {
        this.isLoading$.next(true);
        setTimeout(() => {
            this.isLoading$.next(false);
            this.showChangeEmailForm = false;
            this.cdr.detectChanges();
        }, 1500);
    }

    togglePasswordForm(show: boolean)
    {
        this.showChangePasswordForm = show;
    }

    savePassword()
    {
        this.isLoading$.next(true);
        setTimeout(() => {
            this.isLoading$.next(false);
            this.showChangePasswordForm = false;
            this.cdr.detectChanges();
        }, 1500);
    }

    ngOnDestroy()
    {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}