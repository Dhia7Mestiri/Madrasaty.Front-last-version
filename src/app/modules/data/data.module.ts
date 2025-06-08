import { NgModule           } from '@angular/core';
import { CommonModule       } from '@angular/common';

import { TableModule        } from 'primeng/table';
import { ContextMenuModule  } from 'primeng/contextmenu';
import { MultiSelectModule  } from 'primeng/multiselect';
import { PaginatorModule    } from 'primeng/paginator';

import { SharedModule       } from '@modules/shared/shared.module';

import { DataTableComponent } from './data-table/data-table.component';
import { CardViewComponent  } from './card-view/card-view.component';
import { LoadingComponent   } from './loading/loading.component';
import { DynamicPipe } from '@pipes/dynamic-pipe/dynamic.pipe';


@NgModule({
    declarations: [
        DataTableComponent,
        CardViewComponent,
        LoadingComponent,

        DynamicPipe,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        ContextMenuModule,
        MultiSelectModule,
        PaginatorModule,
    ],
    exports: [
        DataTableComponent,
        CardViewComponent,

        // TODO: Remove primeng modules from here once the data-table component is used everywhere
        TableModule,
        ContextMenuModule,
    ]
})
export class DataModule { }