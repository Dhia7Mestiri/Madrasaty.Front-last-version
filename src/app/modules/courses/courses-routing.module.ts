import { NgModule                  } from '@angular/core';
import { RouterModule, Routes      } from '@angular/router';

// import { AuthorizeGuard            } from '@services/auth/authorize-guard/authorize.guard';

import { CourseHistoriqueComponent } from './course-historiques/course-historique.component';
import { CourseProfileComponent } from './course-profile/course-profile.component';
import { CoursesListComponent      } from './courses-list/courses-list.component';
import { CoursesComponent          } from './courses.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
        children: [
            {
                path       : '',
                component  : CoursesListComponent,
            },              
            { path: 'historique',   component: CourseHistoriqueComponent },
            { path: ':Id',          component: CourseProfileComponent    },
            { path: '**',           component: CoursesListComponent      },
        ],    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }