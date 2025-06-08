import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebComponent     } from './web.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';


const routes: Routes = [
    {
        path     : '',
        component: WebComponent,
        children :
        [
            { path: 'about',   component: AboutUsComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'pricing',   component: PricingComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule { }