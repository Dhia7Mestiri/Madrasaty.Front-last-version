import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthorizeGuard       } from '@services/authorize-guard/authorize.guard';

import { RoleAccessComponent  } from './role-access.component';
import { RbacListComponent    } from './rbac-list/rbac-list.component';
import { RbacEditComponent    } from './rbac-edit/rbac-edit.component';

const routes: Routes = [
    {
        path     : '',
        component: RoleAccessComponent,
        children :
        [
            { path: '',                component: RbacListComponent },  // , canActivate: [AuthorizeGuard] },
            { path: ':id/permissions', component: RbacEditComponent },  // , canActivate: [AuthorizeGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleAccessRoutingModule { }