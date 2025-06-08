import { NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';

import { SharedModule           } from '@modules/shared/shared.module';
import { HolidaysRoutingModule  } from './holidays-routing.module';
import { DataModule             } from '@modules/data/data.module';

import { HolidaysService        } from '@services/holidays/holidays.service';

import { HolidaysComponent      } from './holidays.component';
import { EditHolidayComponent   } from './edit-holiday/edit-holiday.component';
import { DeleteHolidayComponent } from './delete-holiday/delete-holiday.component';
import { NewHolidayComponent    } from './new-holiday/new-holiday.component';
import { HolidaysListComponent  } from './holidays-list/holidays-list.component';


@NgModule({
    declarations: [
        HolidaysComponent,
        EditHolidayComponent,
        DeleteHolidayComponent,
        NewHolidayComponent,
        HolidaysListComponent,
    ],
    imports: [
        CommonModule,
        HolidaysRoutingModule,

        SharedModule,
        DataModule,
    ],
    providers: [
        HolidaysService,
    ],
})
export class HolidaysModule { }