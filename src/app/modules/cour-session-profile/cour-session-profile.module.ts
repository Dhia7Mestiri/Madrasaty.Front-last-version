import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourSessionProfileRoutingModule } from './cour-session-profile-routing.module';
import { CourSessionProfileComponent } from './cour-session-profile.component';
import { DataModule } from '@modules/data/data.module';
import { SharedProfileModule } from '@modules/shared/shared-profile/shared-profile.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '@modules/shared/shared.module';
import { EditorModule } from 'primeng/editor';
import { TasmiiComponent } from './tasmii/tasmii.component';
import { MoutounComponent } from './moutoun/moutoun.component';
import { DocumentsExercicesComponent } from './documents-exercices/documents-exercices.component';
import {RatingModule} from 'primeng/rating';

import {TooltipModule} from 'primeng/tooltip';
import { EditMoutounComponent } from './moutoun/edit-moutoun/edit-moutoun.component';
import { TajwidErrorsComponent } from './tasmii/tajwid-errors/tajwid-errors.component';
import { HistoriqueTasmiiSeanceComponent } from './tasmii/historique-tasmii-seance/historique-tasmii-seance.component';
import { LearningErrorComponent } from './tasmii/learning-error/learning-error.component';
import { HistoriqueMoutounSeanceComponent } from './moutoun/historique-moutoun-seance/historique-moutoun-seance.component';
@NgModule({
  declarations: [
    CourSessionProfileComponent,
    SettingsComponent,
    TasmiiComponent,
    MoutounComponent,
    DocumentsExercicesComponent,
    EditMoutounComponent,
    TajwidErrorsComponent,
    HistoriqueTasmiiSeanceComponent,
    LearningErrorComponent,
    HistoriqueMoutounSeanceComponent
  ],
  imports: [
    CommonModule,
    CourSessionProfileRoutingModule,
    SharedProfileModule,RatingModule,TooltipModule,
    EditorModule,
    SharedModule,
    DataModule,
  ]
})
export class CourSessionProfileModule { }
