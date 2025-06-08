import { NgModule            } from '@angular/core';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { CommonModule        } from '@angular/common';

import { WebRoutingModule    } from './web-routing.module';
import { SharedModule        } from '@modules/shared/shared.module';

import { WebComponent        } from './web.component';
import { ContactComponent    } from './contact/contact.component';
import { AboutUsComponent    } from './about-us/about-us.component';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
    imports: [
        CommonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WebRoutingModule,

        SharedModule
    ],
    declarations: [
        WebComponent,
        ContactComponent,
        AboutUsComponent,
        PricingComponent
    ]
})
export class WebModule { }