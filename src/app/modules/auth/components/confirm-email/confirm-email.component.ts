import { Component, OnInit       } from '@angular/core';
import { Router                  } from '@angular/router';
import { FormBuilder,
         FormControl, Validators } from '@angular/forms';

import { NotificationService     } from '@services/notification/notification.service';
import { RegisterService         } from '@services/register.service';

@Component({
    selector   : 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls  : ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit
{
    ConfirmEmailForm: any;
    errorMessage: string;

    constructor(private fb: FormBuilder, private router: Router,
        private registerservice: RegisterService, private notification: NotificationService)
    { }

    ngOnInit()
    {
        this.ConfirmEmailForm = this.fb.group({
            email: new FormControl("", Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ])),
        });
    }

    ConfirmEmail()
    {
        let email = this.ConfirmEmailForm.get('email').value
        var data = { ...data, email: email };
        this.registerservice.ConfirmEmail(data).subscribe({
            next: () => { this.notification.showSuccess("Email confirmé avec succès"), this.router.navigate(['auth/login']) },
            error: err => this.errorMessage = err
        });
    }
}