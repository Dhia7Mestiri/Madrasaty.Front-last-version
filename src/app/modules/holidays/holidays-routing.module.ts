import { NgModule              } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

// import { AuthGuard          } from '@modules/auth/authGard/auth.guard';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidaysComponent     } from './holidays.component';

const routes: Routes = [
    {
        path: '',
        component: HolidaysComponent,
        children: [
            {
                path     : '',
                // canActivate: [AuthGuard],
                component: HolidaysListComponent,
            },
            // { path: 'sessions/:Id', component: HolidaySessionComponent    },
            // { path: 'historique',   component: HolidayHistoriqueComponent },
            { path: '**', component: HolidaysListComponent },
        ],    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HolidaysRoutingModule { }