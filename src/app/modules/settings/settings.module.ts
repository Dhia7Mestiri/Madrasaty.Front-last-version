import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule          } from '@shared/shared.module';

// import { AgGridModule       } from 'ag-grid-angular';
import { TreeModule            } from 'primeng/tree';
import { ProgressBarModule     } from 'primeng/progressbar';

// import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { DataViewModule } from 'primeng/dataview';
// import { OrderListModule } from 'primeng/orderlist';
// import { KnobModule } from 'primeng/knob';
// import { RippleModule } from 'primeng/ripple';
// import { TableModule } from "primeng/table";
// import { ToolbarModule } from 'primeng/toolbar'
// import { OrganizationChartModule } from 'primeng/organizationchart';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { FileUploadModule } from 'primeng/fileupload';
// import { CardModule } from 'primeng/card';
// import { PickListModule } from 'primeng/picklist';
// import { ListboxModule } from 'primeng/listbox';
// import { AvatarModule } from 'primeng/avatar';
// import { AvatarGroupModule } from 'primeng/avatargroup';
// import { PipesModule } from '@pipes/pipes-module.module';
// import { InputSwitchModule } from 'primeng/inputswitch';
// import { SkeletonModule } from 'primeng/skeleton';

import { UserService          } from '@services/user.service';

import { SettingsComponent    } from './settings.component';
import { TajwidErrorComponent } from './tajwid-error/tajwid-error.component';
import { LevelChildComponent  } from './level/level-child/level-child.component';

// import { LevelComponent } from './level/level.component';

@NgModule({
    declarations: [
        SettingsComponent,
        // HolidaysListComponent,
        // LevelComponent,
        TajwidErrorComponent,
        LevelChildComponent,
    ],
    imports: [
        CommonModule,
        // CardModule,
        // InputSwitchModule,
        // PipesModule,
        // RippleModule,
        // ListboxModule,
        // FileUploadModule,
        // AvatarModule,
        // AvatarGroupModule,
        // ToolbarModule,
        // SplitButtonModule,
        // SkeletonModule,
        // PickListModule,
        // OrganizationChartModule,
        // OverlayPanelModule,
        // TableModule,
        TreeModule,
        ProgressBarModule,
        SettingsRoutingModule,

        SharedModule,

        // WidgetsModule,
        //NgbModule,
        // KnobModule,
        // OrderListModule,
        // DataViewModule,

        // AgGridModule.withComponents(null)
    ],
    providers: [
        UserService,
    ]
})
export class SettingsModule { }