import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourSessionProfileComponent } from './cour-session-profile.component';

const routes: Routes = [
  {
      path: ':Id',
      component: CourSessionProfileComponent,     
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourSessionProfileRoutingModule { }
