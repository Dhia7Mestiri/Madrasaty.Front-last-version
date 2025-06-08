import { NgModule                  } from '@angular/core';
import { CommonModule              } from '@angular/common';

import { SharedModule              } from '@modules/shared/shared.module';
import { DisciplinesRoutingModule  } from './disciplines-routing.module';
import { DataModule                } from '@modules/data/data.module';

import { DisciplinesComponent      } from './disciplines.component';
import { NewDisciplineComponent    } from './new-discipline/new-discipline.component';
import { EditDisciplineComponent   } from './edit-discipline/edit-discipline.component';
import { DeleteDisciplineComponent } from './delete-discipline/delete-discipline.component';
import { DisciplinesListComponent  } from './disciplines-list/disciplines-list.component';


@NgModule({
    declarations: [
        DisciplinesComponent,
        DisciplinesListComponent,
        NewDisciplineComponent,
        EditDisciplineComponent,
        DeleteDisciplineComponent
    ],
    imports: [
        CommonModule,
        DisciplinesRoutingModule,

        SharedModule,
        DataModule,
    ]
})
export class DisciplinesModule { }