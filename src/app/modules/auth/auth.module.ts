import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { HttpClientModule        } from '@angular/common/http';
import { AuthRoutingModule       } from './auth-routing.module';

import { SharedModule            } from '@modules/shared/shared.module';
import { PasswordModule          } from 'primeng/password';

import { RegisterService         } from '@services/register.service';

import { LoginComponent          } from './components/login/login.component';
import { RegistrationComponent   } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent           } from './auth.component';
import { ConfirmEmailComponent   } from './components/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        AuthComponent,
        ConfirmEmailComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,

        SharedModule,
        PasswordModule,
    ],
    providers: [
        RegisterService,
    ]
})
export class AuthModule { }