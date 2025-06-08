import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule        } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule     } from '@modules/shared/shared.module';
import { AuthGuard        } from '@modules/auth/authGard/auth.guard';
import { UserService      } from '@services/user.service';

import { AppComponent     } from './app.component';
import { HolidaysModule } from '@modules/holidays/holidays.module';
import { MoutounsModule } from '@modules/moutouns/moutouns.module';
import { TermsModule } from '@modules/terms/terms.module';
import { ClassroomsModule } from '@modules/classrooms/classrooms.module';
import { DisciplinesModule } from '@modules/disciplines/disciplines.module';
import { TasmiiModule } from '@modules/tasmii/tasmii.module';
import { MembersModule } from '@modules/members/members.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { StatsModule } from '@modules/stats/stats.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HomeComponent } from '@modules/app/home/home.component';

// import { LayoutModule      } from './_metronic/layout';
// import { HolidaysModule    } from './modules/holidays/holidays.module';
// import { MoutounsModule    } from './modules/moutouns/moutouns.module';
// import { TermsModule       } from './modules/terms/terms.module';
// import { ClassroomsModule  } from './modules/classrooms/classrooms.module';
// import { DisciplinesModule } from './modules/disciplines/disciplines.module';
// import { TasmiiModule      } from './modules/tasmii/tasmii.module';
// import { MembersModule     } from './modules/members/members.module';
// import { StatsModule       } from './modules/stats/stats.module';
// import { HomeComponent     } from './modules/app/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,

        //LayoutModule,

        HolidaysModule,
        MoutounsModule,
        TermsModule,
        ClassroomsModule,
        DisciplinesModule,
        TasmiiModule,
        MembersModule,
        ProfileModule,
        StatsModule,
        InlineSVGModule.forRoot(),
    ],
    providers: [
        UserService,
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }