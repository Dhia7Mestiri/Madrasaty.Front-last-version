import { NgModule             } from '@angular/core';
import { CommonModule         } from '@angular/common';
import { NgxStripeModule      } from 'ngx-stripe';

import { AccountRoutingModule } from './account-routing.module';
import { InputSwitchModule    } from 'primeng/inputswitch';
//import { DropdownMenusModule  } from '../../_metronic/partials';
import { SharedModule         } from '@modules/shared/shared.module';

import { AccountComponent           } from '../account/account.component';
import { OverviewComponent          } from './overview/overview.component';
import { SettingsComponent          } from './settings/settings.component';
import { ProfileDetailsComponent    } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { NotificationsComponent     } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent      } from './settings/forms/sign-in-method/sign-in-method.component';
import { StripeComponent            } from './stripe/stripe.component';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
    declarations: [
        AccountComponent,
        OverviewComponent,
        SettingsComponent,
        ProfileDetailsComponent,
        ConnectedAccountsComponent,
        DeactivateAccountComponent,
        NotificationsComponent,
        SignInMethodComponent,
        StripeComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
     //   DropdownMenusModule,
        ProgressBarModule,
        SharedModule,

        InputSwitchModule,
        NgxStripeModule.forRoot('pk_test_51Ksla8H1ud48pyOPeASTZ4Xy0wpENbfmW7Cl2ocTxKq0Jx9XQT4GRMLqd0iCf8glTZMQOBLX3YLcMfAYVAjKtIlu00Taq1xkO8'),
    ],
})
export class AccountModule { }