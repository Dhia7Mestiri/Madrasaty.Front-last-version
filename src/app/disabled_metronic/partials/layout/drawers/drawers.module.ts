import { NgModule                   } from '@angular/core';
import { CommonModule               } from '@angular/common';
// import { RouterModule            } from '@angular/router';
// import { FormsModule             } from '@angular/forms';
import { ChatInnerModule            } from '../../content/chat-inner/chat-inner.module';
import { SharedModule               } from '@modules/shared/shared.module';

import { ActivityDrawerComponent    } from './activity-drawer/activity-drawer.component';
import { ExploreMainDrawerComponent } from './explore-main-drawer/explore-main-drawer.component';
import { MessengerDrawerComponent   } from './messenger-drawer/messenger-drawer.component';


@NgModule({
    declarations: [
        ActivityDrawerComponent,
        ExploreMainDrawerComponent,
        MessengerDrawerComponent
    ],
    imports: [
        CommonModule,
        // RouterModule,
        // FormsModule,
        ChatInnerModule,

        SharedModule,
    ],
    exports: [
        ActivityDrawerComponent,
        ExploreMainDrawerComponent,
        MessengerDrawerComponent,
    ],
})
export class DrawersModule { }