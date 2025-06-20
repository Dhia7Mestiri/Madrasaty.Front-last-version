import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsExamplesRoutingModule } from './widgets-examples-routing.module';
// import { WidgetsModule } from '../../_metronic/partials';

import { WidgetsExamplesComponent } from './widgets-examples.component';
import { ListsComponent } from './lists/lists.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { MixedComponent } from './mixed/mixed.component';
import { TablesComponent } from './tables/tables.component';
import { FeedsComponent } from './feeds/feeds.component';

@NgModule({
    declarations: [
        WidgetsExamplesComponent,
        ListsComponent,
        StatisticsComponent,
        ChartsComponent,
        MixedComponent,
        TablesComponent,
        FeedsComponent,
    ],
    imports: [
        CommonModule,
        WidgetsExamplesRoutingModule,
        // WidgetsModule
    ],
})
export class WidgetsExamplesModule { }