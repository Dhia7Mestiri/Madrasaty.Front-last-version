import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { SchoolComponent      } from './school/school.component';
// import { EditSchoolComponent  } from './edit-school/edit-school.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolsComponent     } from './schools.component';

const routes: Routes = [
    // { path: '',         component: SchoolsListComponent },
    // { path: 'edit/:id', component: EditSchoolComponent  },
     //{ path: '**',       component: SchoolComponent      },

    {
        path: '',
        component: SchoolsComponent,
        children: [
            {
                path     : '',
                // canActivate: [AuthGuard],
                component: SchoolsListComponent,
            },
            // { path: 'sessions/:Id', component: CourseSessionComponent    },
            // { path: 'historique',   component: CourseHistoriqueComponent },
            { path: '**',           component: SchoolsListComponent      },
        ],    
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolsRoutingModule { }