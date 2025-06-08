import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule         } from '@modules/shared/shared.module';
import { DataModule           } from '@modules/data/data.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { EditorModule         } from 'primeng/editor';

import { CoursesComponent            } from './courses.component';
import { CourseHistoriqueComponent   } from './course-historiques/course-historique.component';
import { CoursesListComponent        } from './courses-list/courses-list.component';
import { CourseProfileComponent      } from './course-profile/course-profile.component';
import { ExamensComponent            } from './course-profile/examens/examens.component';
import { CourSessionsComponent       } from './course-profile/cour-sessions/cour-sessions.component';
import { StudentsComponent           } from './course-profile/students/students.component';
import { SettingsComponent           } from './course-profile/settings/settings.component';
import { SharedProfileModule         } from '@modules/shared/shared-profile/shared-profile.module';
import { EditCourseComponent         } from './edit-course/edit-course.component';
@NgModule({
    declarations: [
        CoursesComponent,
        CourseHistoriqueComponent,
        CoursesListComponent,
        SettingsComponent,
        CourseProfileComponent,        
        StudentsComponent,
        ExamensComponent,
        CourSessionsComponent,
        EditCourseComponent,
    ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        SharedProfileModule,
        EditorModule,
        SharedModule,
        DataModule,
    ],
})
export class CoursesModule { }