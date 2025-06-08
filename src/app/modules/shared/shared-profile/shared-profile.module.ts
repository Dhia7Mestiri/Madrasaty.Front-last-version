import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewProfileComponent } from './overview-profile/overview-profile.component';
import { TabslistComponent } from './tablist/tabs-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared.module";



@NgModule({
    declarations: [
        OverviewProfileComponent,
        TabslistComponent,
        ProfileComponent,
        ToolBarComponent,
        ProfileSettingsComponent
    ],
    exports: [OverviewProfileComponent, TabslistComponent, ProfileComponent, ToolBarComponent, ProfileSettingsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class SharedProfileModule { }
