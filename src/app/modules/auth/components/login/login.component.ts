import { Component, OnInit,
         OnDestroy                } from '@angular/core';
import { HttpErrorResponse        } from '@angular/common/http';
import { FormBuilder, FormGroup,
         Validators               } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router   } from '@angular/router';

import { UserService         } from '@services/user.service';
import { NotificationService as NT}  from '@services/notification/notification.service';
import { NotificationService } from '@services/notification.service';
import { IUser } from '@interfaces/user';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy
{
    defaultAuth: any = {
        email   : '',
        password: '',  // 'passer',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;
    list;
    hide = true;

    // private fields
    private unsubscribe: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private notification: NT,
        private stateNotification : NotificationService

    )
    { }

    ngOnInit()
    {
        if(this.userService.getMemberId()>0)
            {
                this.router.navigate(['/'])
                return 
            }
        this.initForm();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    initForm()
    {
        this.loginForm = this.fb.group({
            email: [
                this.defaultAuth.email,
                Validators.compose([
                    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
                    Validators.email,
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(320),
                ]),
            ],
            password: [
                this.defaultAuth.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(100),
                ]),
            ],
        });
    }

    ngOnDestroy()
    {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    get emailAdresse()
    {
        return this.loginForm.get('email');
    }

    get password()
    {
        return this.loginForm.get('password');
    }
    loginUser(): void {
       
        this.userService.getUserToken(this.loginForm.value)
          .subscribe({
            next: (user: IUser) => {
              this.userService.UserLoggedIn = user;
              this.stateNotification.loginChanged(user) ;
              this.router.navigate([this.returnUrl]);
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error during login:', error);
              if (error.error && error.error.error_description) {
                this.notification.showError(error.error.error_description);
              } else {
                this.notification.showError('An error occurred during login.');
              }
            }
            
          });
        
      }
      
      
}