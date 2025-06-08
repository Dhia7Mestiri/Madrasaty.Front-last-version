import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //     path        : 'dashboard',
    //     loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    // },
    {
        path        : 'crafted/pages/profile',
        loadChildren: () => import('@modules/profile/profile.module').then((m) => m.ProfileModule)
    },
    {
        path        : 'crafted/account',
        loadChildren: () => import('@modules/account/account.module').then((m) => m.AccountModule)
    },
    {
        path        : 'crafted/pages/wizards',
        loadChildren: () => import('@modules/wizards/wizards.module').then((m) => m.WizardsModule)
    },
    {
        path        : 'crafted/settings',
        loadChildren: () => import('@modules/settings/settings.module').then((m) => m.SettingsModule)
    },
    {
        path        : 'crafted/evaluation',
        loadChildren: () => import('@modules/evaluation/evaluation.module').then((m) => m.EvaluationModule)
    },
    // {
    //     path        : 'crafted/widgets',
    //     loadChildren: () => import('@modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule)
    // },
    {
        path        : 'apps/chat',
        loadChildren: () => import('@modules/apps/chat/chat.module').then((m) => m.ChatModule)
    },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }