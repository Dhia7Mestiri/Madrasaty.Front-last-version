import { NgModule                 } from '@angular/core';
import { RouterModule, Routes     } from '@angular/router';

import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplinesComponent     } from './disciplines.component';

const routes: Routes = [
{
    path: '',
    component: DisciplinesComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: DisciplinesListComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisciplinesRoutingModule { }