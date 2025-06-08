import { NgModule             } from '@angular/core';
import { CommonModule         } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SharedModule         } from '@modules/shared/shared.module';
import { DataModule           } from '@modules/data/data.module';

import { SchoolService        } from '@services/school/school.service';

import { SchoolsComponent     } from './schools.component';
import { EditSchoolComponent  } from './edit-school/edit-school.component';
// import { SchoolComponent   } from './school/school.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';


@NgModule({
    declarations: [
        SchoolsComponent,
        EditSchoolComponent,
        //SchoolComponent,
        SchoolsListComponent,
    ],
    imports: [
        CommonModule,
        SchoolsRoutingModule,

        SharedModule,
        DataModule,
    ],
    providers: [
        SchoolService,
    ],
})
export class SchoolsModule { }