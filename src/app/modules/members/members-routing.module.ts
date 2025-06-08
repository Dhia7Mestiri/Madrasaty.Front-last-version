import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListMembersComponent } from './list-members/list-members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent     } from './members.component';

const routes: Routes = [
{
    path: '',
    component: MembersComponent,
    children: [
        {
            path     : '',
            // canActivate: [AuthGuard],
            component: ListMembersComponent,
        },
        { path: ':Id', component: MemberDetailsComponent    },
        // { path: 'historique',   component: CourseHistoriqueComponent },
        { path: '**', component: ListMembersComponent },
    ],    
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembersRoutingModule { }