import { NgModule                } from '@angular/core';
import { RouterModule, Routes    } from '@angular/router';

import { ClassroomsListComponent } from './classrooms-list/classrooms-list.component';
import { ClassroomsComponent     } from './classrooms.component';

const routes: Routes = [
{
    path: '',
    component: ClassroomsComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: ClassroomsListComponent,
        },
        // { path: 'sessions/:Id', component: CourseSessionComponent    },
        // { path: 'historique',   component: CourseHistoriqueComponent },
        { path: '**', component: ClassroomsListComponent },
    ],    
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassroomsRoutingModule { }