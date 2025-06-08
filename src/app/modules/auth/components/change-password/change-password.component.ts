import { Component, OnInit        } from '@angular/core';
import { FormBuilder, FormControl,
         Validators, FormGroup    } from '@angular/forms';
import { ActivatedRoute, Router   } from '@angular/router';

import { NotificationService      } from '@services/notification/notification.service';
import { RegisterService          } from '@services/register.service';

@Component({
    selector   : 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls  : ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit
{
    ChangePasswordForm: FormGroup;
    form;
    errorMessage;
    userId: any;
    sub: any;
    passmsg: string;
    hide = true;

    constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService,
        private route: ActivatedRoute, private notification: NotificationService)
    { }

    ngOnInit()
    {
        this.ChangePasswordForm = this.fb.group({
            Password: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
            ]),
            ConfirmPassword: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
            ]),
        })

        this.sub = this.route.params.subscribe(
            params => {
                const id = params['Id'];
                this.userId = id;
            });
    }

    checkPassSame()
    {
        let Password = this.ChangePasswordForm.value.Password;
        let ConfirmPassword = this.ChangePasswordForm.value.ConfirmPassword;
        if (Password == ConfirmPassword) {
            this.passmsg = '';
            return false;
        } else {
            this.passmsg = "New Password did not match.";
            return true;
        }
    }

    changePassword()
    {
        if (this.ChangePasswordForm.valid)
        {
            var aux = { ...this.form, ...this.ChangePasswordForm.value };
            var aux = { ...aux, Id: this.userId };
            console.log(aux)
            this.registerService.editPassword(aux)
                .subscribe({
                    next: () => { this.notification.showSuccess("'mot de passe modifié avec succès"), this.router.navigate(['auth/login']) },
                    error: err => this.errorMessage = err
                });
        }
        else
        {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }
}