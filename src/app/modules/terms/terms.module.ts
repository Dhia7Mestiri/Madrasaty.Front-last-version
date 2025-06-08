import { NgModule            } from '@angular/core';
import { CommonModule        } from '@angular/common';

import { TermsRoutingModule  } from './terms-routing.module';
import { SharedModule        } from '@modules/shared/shared.module';
import { DataModule          } from '@modules/data/data.module';

import { TermsComponent      } from './terms.component';
import { NewTermComponent    } from './new-term/new-term.component';
import { EditTermComponent   } from './edit-term/edit-term.component';
import { DeleteTermComponent } from './delete-term/delete-term.component';
import { TermsListComponent  } from './terms-list/terms-list.component';
// import { SchoolYearComponent } from './school-year/school-year.component';


@NgModule({
    declarations: [
        TermsComponent,
        NewTermComponent,
        EditTermComponent,
        DeleteTermComponent,
        TermsListComponent,
        // SchoolYearComponent,
    ],
    imports: [
        CommonModule,
        TermsRoutingModule,

        SharedModule,
        DataModule,
    ]
})
export class TermsModule { }