import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { FullCalendarModule      } from '@fullcalendar/angular';
// import { RatingModule         } from 'ngx-bootstrap/rating';

import { InputNumberModule       } from 'primeng/inputnumber';
import { ProgressBarModule       } from 'primeng/progressbar';
// import { RadioButtonModule    } from 'primeng/radiobutton';
// import { DataViewModule       } from 'primeng/dataview';
// import { BadgeModule          } from 'primeng/badge';
// import { PanelModule          } from 'primeng/panel';
// import { RippleModule         } from 'primeng/ripple';
// import { FileUploadModule     } from 'primeng/fileupload';
// import { InputTextareaModule  } from 'primeng/inputtextarea';
// import { EditorModule         } from 'primeng/editor';
// import { AvatarModule         } from 'primeng/avatar';
// import { AvatarGroupModule    } from 'primeng/avatargroup';

import { PipesModule             } from 'src/app/pipes/pipes.module';
import { SharedModule            } from '@modules/shared/shared.module';

import { EvaluationComponent         } from './evaluation.component';
import { CalendarComponent           } from './calendar/calendar.component';
import { EvaluationDropDownComponent } from './evaluation-dropdown/evaluation-drop-down.component';

import dayGridPlugin     from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin    from '@fullcalendar/timegrid';
import listPlugin        from '@fullcalendar/list';
import { RippleModule } from 'primeng/ripple';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin,
]);

@NgModule({
    declarations: [
        EvaluationComponent,
        CalendarComponent,
        EvaluationComponent,
        EvaluationDropDownComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,

        RippleModule,
        //PanelModule,
        EditorModule,
        //BadgeModule,
        //AvatarModule,
        //AvatarGroupModule,
        //DataViewModule,
        FileUploadModule,
        //InputTextareaModule,
        //RadioButtonModule,
        ProgressBarModule,
        InputNumberModule,
        FullCalendarModule,
        EvaluationRoutingModule,

        SharedModule,

        RatingModule,  // .forRoot(),
    ],
    exports: [
        EvaluationComponent,
        CalendarComponent,
        EvaluationComponent,
        EvaluationDropDownComponent,
    ],
    providers: [
        //{ provide: NgbTimeAdapter, useClass: MoutounSessionComponent }, { provide: NgbTimeAdapter, useClass: TasmiiSessionComponent },
        //{ provide: NgbTimeAdapter, useClass: ExamenComponent }, { provide: NgbTimeAdapter, useClass: CourseComponent }
    ]
})
export class EvaluationModule { }