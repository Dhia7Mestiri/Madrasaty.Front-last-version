import { NgModule                } from '@angular/core';
import { RouterModule, Routes    } from '@angular/router';

import { DashboardComponent      } from './dashboard.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
// import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
// import { DashboardParentComponent  } from './dashboard-parent/dashboard-parent.component';
// import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
// import { DashboardDeanComponent    } from './dashboard-dean/dashboard-dean.component';

const routes: Routes = [
{
    path: '',
    component: DashboardComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: DashboardIndexComponent,
        },
        // { path: 'student/:Id', component: DashboardStudentComponent },
        // { path: 'parent/:Id',  component: DashboardParentComponent  },
        // { path: 'teacher/:Id', component: DashboardTeacherComponent },
        // { path: 'teacher/:Id', component: DashboardDeanComponent    },
        { path: '**', component: DashboardIndexComponent },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }