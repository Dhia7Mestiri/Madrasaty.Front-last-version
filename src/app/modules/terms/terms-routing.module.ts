import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { TermsListComponent} from './terms-list/terms-list.component';
//import { SchoolYearComponent} from './school-year/school-year.component';
import { TermsListComponent   } from './terms-list/terms-list.component';
import { TermsComponent       } from './terms.component';

const routes: Routes = [
    {
        path     : '',
        component: TermsComponent,
        children :  [
            {
                path     : '',
                // canActivate: [AuthGuard],
                component: TermsListComponent,
            },
            { path: '**', component: TermsListComponent },  // SchoolYearComponent
        ],    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TermsRoutingModule { }