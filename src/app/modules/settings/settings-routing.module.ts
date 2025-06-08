import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent    } from './settings.component';
import { TajwidErrorComponent } from './tajwid-error/tajwid-error.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            // {
            //     path: '',
            //     component: MembersComponent,
            // },
            // {
            //     path: 'member/:id',
            //     component: MemberDetailsComponent,
            // },
            {
                path: 'tajwid-error',
                component: TajwidErrorComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }