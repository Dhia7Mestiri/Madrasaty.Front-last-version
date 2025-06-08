import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasmiiComponent                    } from './tasmii.component';
import { EvaluationDetailleeComponent       } from './evaluation-detaillee/evaluation-detaillee.component';
import { TasmiiHistoriquesComponent         } from './tasmii-historiques/tasmii-historiques.component';
import { TasmiiSessionParticipantsComponent } from './tasmii-session-participants/tasmii-session-participants.component';
import { TasmiiSessionComponent             } from './tasmii-session/tasmii-session.component';


const routes: Routes = [
{
    path: '',
    component: TasmiiComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: TasmiiSessionComponent,
        },
        {
            path     : 'historique',
            // canActivate: [AuthGuard],
            component: TasmiiHistoriquesComponent,
        },
        {
            path: 'tasmii/participants/:Id',
            component: TasmiiSessionParticipantsComponent,
        },
        {
            path: 'tasmii/evaluation-detaillee/:Id/:SessionId',
            component: EvaluationDetailleeComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasmiiRoutingModule { }