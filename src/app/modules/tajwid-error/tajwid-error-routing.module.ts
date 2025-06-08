import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TajwidErrorComponent } from './tajwid-error.component';


const routes: Routes = [
  {
    path: '',
    component: TajwidErrorComponent,   
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TajwidErrorRoutingModule { }
