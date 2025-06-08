import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamensComponent          } from './examens.component';
import { NoteExamenComponent       } from './note-examen/note-examen.component';
import { ExamenHistoriqueComponent } from './examen-historique/examen-historique.component';
import { ListExamensComponent      } from './list-examens/list-examens.component';
import { ExamenProfileComponent } from './examen-profile/examen-profile.component';

const routes: Routes = [
    {
        path     : '',
        component: ExamensComponent,
        children :  [
            { path: '',            component: ListExamensComponent      },                      
            { path: 'historique',  component: ExamenHistoriqueComponent },
            { path: ':Id', component: ExamenProfileComponent    },
            { path: 'notes/:id',   component: NoteExamenComponent       },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamensRoutingModule { }