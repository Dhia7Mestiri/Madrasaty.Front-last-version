import { NgModule              } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { MoutounsComponent                   } from './moutouns.component';
import { EvaluationSimpleComponent           } from './evaluation-simple/evaluation-simple.component';
import { MoutounSessionParticipantsComponent } from './moutoun-session-participants/moutoun-session-participants.component';
import { MoutounSessionsComponent            } from './moutoun-sessions/moutoun-sessions.component';
import { MoutounsHistoriqueComponent         } from './moutouns-historique/moutouns-historique.component';
import { MoutounsListComponent               } from './moutouns-list/moutouns-list.component';


const routes: Routes = [
{
    path: '',
    component: MoutounsComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: MoutounsListComponent,
        },
        // {
        //     path     : 'historique',
        //     // canActivate: [AuthGuard],
        //     component: MoutounsListComponent,
        // },
        {
            path     : 'session',
            // canActivate: [AuthGuard],
            component: MoutounSessionsComponent,
        },
        {
            path     : 'historique',
            // canActivate: [AuthGuard],
            component: MoutounsHistoriqueComponent,
        },
        {
            path     : 'participants/:Id',
            // canActivate: [AuthGuard],
            component: MoutounSessionParticipantsComponent,
        },
        {
            path     : 'evaluation-simple/:Id/:SessionId',
            // canActivate: [AuthGuard],
            component: EvaluationSimpleComponent,
        },
        { path: '**',  component: MoutounsListComponent },        
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoutounsRoutingModule { }