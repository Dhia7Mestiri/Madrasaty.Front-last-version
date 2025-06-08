import { NgModule                    } from '@angular/core';
import { CommonModule                } from '@angular/common';
import { RouterModule                } from '@angular/router';
// import { FormsModule,
//          ReactiveFormsModule         } from '@angular/forms';
import { DropdownModule              } from 'primeng/dropdown';
// import { TranslationModule           } from '@modules/i18n';
import { SharedModule                } from '@modules/shared/shared.module';

import { AppResolverService          } from '@services/app-resolver.service';
import { UserService                 } from '@services/user.service';
import { MembersListService          } from '@services/members/members-list.service';
import { SchoolyearService           } from '@services/schoolyear/schoolyear.service';

import { DatePipe                    } from '@angular/common';

import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { QuickLinksInnerComponent    } from './dropdown-inner/quick-links-inner/quick-links-inner.component';
import { UserInnerComponent          } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent    } from './scroll-top/scroll-top.component';

@NgModule({
    declarations: [
        NotificationsInnerComponent,
        QuickLinksInnerComponent,
        UserInnerComponent,
        LayoutScrollTopComponent,
    ],
    imports: [
        CommonModule,
        // RouterModule,
        // FormsModule,
        // ReactiveFormsModule,
        // TranslationModule,
        DropdownModule,

        SharedModule,
    ],
    exports: [
        NotificationsInnerComponent,
        QuickLinksInnerComponent,
        UserInnerComponent,
        LayoutScrollTopComponent,
    ],
    providers: [
        UserService,
        // MembersListService,
        SchoolyearService,
        DatePipe,
        AppResolverService
    ]
})
export class ExtrasModule { }