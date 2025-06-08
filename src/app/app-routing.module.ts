import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@modules/auth/authGard/auth.guard';
// import { AuthGuard         } from '@modules/auth/authGard/auth.guard';

export const routes: Routes = [
    {
        path        : 'dashboard',
         canActivate : [AuthGuard],
        loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        // redirectTo  : '/dashboard',
        pathMatch   : 'full',
    },
    {
        path        : 'roles',  
        //canActivate: [AuthorizeGuard],
        loadChildren: () => import('@modules/role-access/role-access.module').then(w => w.RoleAccessModule)
    },
    {
        path: 'web',   loadChildren: () => import('@modules/web/web.module').then((m) => m.WebModule),
    },
    {
        path: 'auth',  loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule),
    },
    // {
    //     path: 'error', loadChildren: () => import('@modules/errors/errors.module').then((m) => m.ErrorsModule),
    // },
     {
        path: 'profile', loadChildren: () => import('@modules/profile/profile.module').then((m) => m.ProfileModule),
     },
    {
        path: 'account', loadChildren: () => import('@modules/account/account.module').then((m) => m.AccountModule),
    },
    {
        path        : 'schools',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/schools/schools.module').then((m) => m.SchoolsModule)
    },
    {
        path        : 'courses',
         canActivate : [AuthGuard],
        loadChildren: () => import('@modules/courses/courses.module').then((m) => m.CoursesModule)
    },
    {
        path        : 'examens',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/examens/examens.module').then((m) => m.ExamensModule)
    },
    {
        path        : 'evaluations',
        //canActivate : [AuthGuard],
        loadChildren: () => import('@modules/evaluation/evaluation.module').then((m) => m.EvaluationModule)
    },
    {
        path        : 'holidays',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/holidays/holidays.module').then((m) => m.HolidaysModule)
    },
    {
        path        : 'moutouns',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/moutouns/moutouns.module').then((m) => m.MoutounsModule)
    },
    {
        path        : 'tasmii',
        //canActivate : [AuthGuard],
        loadChildren: () => import('@modules/tasmii/tasmii.module').then((m) => m.TasmiiModule)
    },
    {
        path        : 'terms',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/terms/terms.module').then((m) => m.TermsModule)
    },
    {
        path        : 'classrooms',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/classrooms/classrooms.module').then((m) => m.ClassroomsModule)
    },
    {
        path        : 'disciplines',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/disciplines/disciplines.module').then((m) => m.DisciplinesModule)
    },
    {
        path        : 'members',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/members/members.module').then((m) => m.MembersModule)
    },
    {
        path        : 'stats',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/stats/stats.module').then((m) => m.StatsModule)
    },
    {
        path        : 'tajwid-error',
        canActivate : [AuthGuard],
        loadChildren: () => import('@modules/tajwid-error/tajwid-error.module').then((m) => m.TajwidErrorModule)
    },
    {
        path        : 'cour-session-profile',
        // canActivate : [AuthGuard],
        loadChildren: () => import('@modules/cour-session-profile/cour-session-profile.module').then((m) => m.CourSessionProfileModule)
    },
    {
        path        : '**',
        // canActivate : [AuthGuard],
        // loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        redirectTo  : '/dashboard',
        pathMatch   : 'full',
    },
    // { path: '**', redirectTo: 'error/404' },
];

@NgModule({
    // To debug   =>  .forRoot(routes, { enableTracing: true })
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }