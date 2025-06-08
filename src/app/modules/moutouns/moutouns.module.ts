import { NgModule                  } from '@angular/core';
import { CommonModule              } from '@angular/common';

import { MoutounsRoutingModule     } from './moutouns-routing.module';
import { SharedModule              } from '@modules/shared/shared.module';
import { EvaluationModule          } from '@modules/evaluation/evaluation.module';
import { DataModule                } from '@modules/data/data.module';

import { MoutounsComponent         } from './moutouns.component';
import { EditMoutounComponent      } from './edit-moutoun/edit-moutoun.component';
import { DeleteMoutounComponent    } from './delete-moutoun/delete-moutoun.component';
import { NewMoutounComponent       } from './new-moutoun/new-moutoun.component';
import { MoutounsListComponent     } from './moutouns-list/moutouns-list.component';
import { MoutounSessionsComponent  } from './moutoun-sessions/moutoun-sessions.component';
import { EvaluationSimpleComponent } from './evaluation-simple/evaluation-simple.component';
import { MoutounSessionParticipantsComponent } from './moutoun-session-participants/moutoun-session-participants.component';
import { MoutounsHistoriqueComponent         } from './moutouns-historique/moutouns-historique.component';


@NgModule({
    declarations: [
        MoutounsComponent,
        EditMoutounComponent,
        DeleteMoutounComponent,
        MoutounsListComponent,
        MoutounSessionsComponent,
        NewMoutounComponent,
        MoutounsHistoriqueComponent,
        MoutounSessionParticipantsComponent,
        EvaluationSimpleComponent,
    ],
    imports: [
        CommonModule,
        MoutounsRoutingModule,

        SharedModule,
        DataModule,
        EvaluationModule,
    ]
})
export class MoutounsModule { }