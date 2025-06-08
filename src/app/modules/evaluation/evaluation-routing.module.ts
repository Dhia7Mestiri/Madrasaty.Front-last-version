import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent    } from './calendar/calendar.component';
import { EvaluationComponent  } from './evaluation.component';

const routes: Routes = [
{
    path     : '',
    component: EvaluationComponent,
    children :  [
        {
            path     : 'calendar',
            component: CalendarComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvaluationRoutingModule { }