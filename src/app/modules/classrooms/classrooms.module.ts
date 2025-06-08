import { NgModule                 } from '@angular/core';
import { CommonModule             } from '@angular/common';

import { SharedModule             } from '@modules/shared/shared.module';
import { ClassroomsRoutingModule  } from './classrooms-routing.module';
import { DataModule               } from '@modules/data/data.module';
import { ClassroomsComponent      } from './classrooms.component';
import { EditClassroomComponent   } from './edit-classroom/edit-classroom.component';
import { ClassroomsListComponent  } from './classrooms-list/classrooms-list.component';


@NgModule({
    declarations: [
        ClassroomsComponent,
        ClassroomsListComponent,
        EditClassroomComponent,
    
    ],
    imports: [
        CommonModule,
        ClassroomsRoutingModule,
        SharedModule,
        DataModule,
    ]
})
export class ClassroomsModule { }