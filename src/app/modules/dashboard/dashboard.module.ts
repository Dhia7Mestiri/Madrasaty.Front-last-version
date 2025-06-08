import { NgModule           } from '@angular/core';
import { CommonModule       } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
// import { ChartModule     } from 'primeng/chart';

import { SharedModule           } from '@modules/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent        } from './dashboard.component';
import { DashboardIndexComponent   } from './dashboard-index/dashboard-index.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { DashboardParentComponent  } from './dashboard-parent/dashboard-parent.component';
import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
import { DashboardDeanComponent    } from './dashboard-dean/dashboard-dean.component';

import dayGridPlugin     from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin    from '@fullcalendar/timegrid';
import listPlugin        from '@fullcalendar/list';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin,
]);
@NgModule({
    declarations: [
        DashboardComponent,
        DashboardIndexComponent,
        DashboardStudentComponent,
        DashboardParentComponent,
        DashboardTeacherComponent,
        DashboardDeanComponent,
    ],
    imports: [
        CommonModule,
        FullCalendarModule,
        // NgApexchartsModule,
        // ChartModule,

        SharedModule,
        DashboardRoutingModule,
        // RouterModule.forChild([
        //     {
        //         path: '',
        //         component: DashboardIndexComponent,
        //     },
        // ]),
        // WidgetsModule,
    ],
})
export class DashboardModule { }