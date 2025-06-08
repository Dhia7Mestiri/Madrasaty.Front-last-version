import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamensRoutingModule      } from './examens-routing.module';
import { SharedModule              } from '@modules/shared/shared.module';
import { DataModule                } from '@modules/data/data.module';

import { ExamensComponent          } from './examens.component';
import { ExamenHistoriqueComponent } from '../examens/examen-historique/examen-historique.component';
import { NoteExamenComponent       } from './note-examen/note-examen.component';
import { NewExamenComponent        } from './new-examen/new-examen.component';
import { ListExamensComponent      } from './list-examens/list-examens.component';
import { ExamenProfileComponent } from './examen-profile/examen-profile.component';
import { SharedProfileModule } from '@modules/shared/shared-profile/shared-profile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamensNotesComponent } from './examen-profile/examens-notes/examens-notes.component';
import { SettingsComponent } from './examen-profile/settings/settings.component';
import { EditExamenComponent } from './edit-examen/edit-examen.component';


@NgModule({
    declarations: [
        ExamensComponent,
        ListExamensComponent,
        EditExamenComponent,
        ExamenHistoriqueComponent,
        NoteExamenComponent,
        NewExamenComponent,
        ListExamensComponent,
        ExamenProfileComponent,
        ExamensNotesComponent,
        SettingsComponent,
        
    ],
    imports: [     
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ExamensRoutingModule,
        SharedProfileModule,
        SharedModule,
        DataModule,
    ],
})
export class ExamensModule { }