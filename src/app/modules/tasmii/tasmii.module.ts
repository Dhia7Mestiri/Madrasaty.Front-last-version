import { NgModule            } from '@angular/core';
import { CommonModule, DatePipe        } from '@angular/common';

import { ProgressBarModule   } from 'primeng/progressbar';
import { RatingModule        } from 'primeng/rating';

import { TasmiiRoutingModule } from './tasmii-routing.module';
import { SharedModule        } from '@modules/shared/shared.module';
import { DataModule          } from '@modules/data/data.module';
import { EvaluationModule    } from '@modules/evaluation/evaluation.module';

import { TasmiiComponent                    } from './tasmii.component';
import { EvaluationDetailleeComponent       } from './evaluation-detaillee/evaluation-detaillee.component';
import { TajwidSubErrorsComponent           } from './tajwid-sub-errors/tajwid-sub-errors.component';
import { TasmiiSessionComponent             } from './tasmii-session/tasmii-session.component';
import { TasmiiSessionParticipantsComponent } from './tasmii-session-participants/tasmii-session-participants.component';
import { TasmiiHistoriquesComponent         } from './tasmii-historiques/tasmii-historiques.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';




@NgModule({
    declarations: [
        TasmiiComponent,
        EvaluationDetailleeComponent,
        TajwidSubErrorsComponent,
        TasmiiSessionComponent,
        TasmiiSessionParticipantsComponent,
        TasmiiHistoriquesComponent,
    ],
    imports: [
        CommonModule,
        TasmiiRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        SharedModule,
        DataModule,
        EvaluationModule,
        ProgressBarModule,
        RatingModule,MatDialogModule,MatFormFieldModule,MatSelectModule,MatButtonModule,MatInputModule
    ],
    providers:[DatePipe]
})
export class TasmiiModule { }