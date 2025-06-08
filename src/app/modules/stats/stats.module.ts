import { NgModule            } from '@angular/core';
import { CommonModule        } from '@angular/common';

import { StatsRoutingModule  } from './stats-routing.module';
import { SharedModule        } from '@modules/shared/shared.module';
import { StatsIndexComponent } from './stats-index/stats-index.component';
import { StatsComponent      } from './stats.component';


@NgModule({
    declarations: [
        StatsComponent,
        StatsIndexComponent,
    ],
    imports: [
        CommonModule,
        StatsRoutingModule,

        SharedModule,
    ]
})
export class StatsModule { }