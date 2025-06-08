import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TajwidErrorRoutingModule } from './tajwid-error-routing.module';
import {TreeModule} from 'primeng/tree';
import { TajwidErrorComponent } from './tajwid-error.component';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [TajwidErrorComponent],
  imports: [
    CommonModule,
    TreeModule,
    ButtonModule,
    TooltipModule,
    TajwidErrorRoutingModule
  ]
})
export class TajwidErrorModule { }
