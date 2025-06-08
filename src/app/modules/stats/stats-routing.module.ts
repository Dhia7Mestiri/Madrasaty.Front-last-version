import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsComponent       } from './stats.component';
import { StatsIndexComponent  } from './stats-index/stats-index.component';

const routes: Routes = [
    {
        path: '',
        component: StatsComponent,
        children: [
            {
                path     : '',
                // canActivate: [AuthGuard],
                component: StatsIndexComponent,
            },
            // {
            //     path     : 'historique',
            //     // canActivate: [AuthGuard],
            //     component: StatsHistoriquesComponent,
            // },
            // {
            //     path: 'Stats/participants/:Id',
            //     component: StatsSessionParticipantsComponent,
            // },
            // {
            //     path: 'Stats/evaluation-detaillee/:Id/:SessionId',
            //     component: EvaluationDetailleeComponent,
            // },
        ],
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }