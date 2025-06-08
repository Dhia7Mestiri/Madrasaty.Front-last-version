import { NgModule            } from '@angular/core';
import { CommonModule        } from '@angular/common';
import { RouterModule        } from '@angular/router';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { HttpClient,
         HttpClientModule    } from '@angular/common/http';


// ============
// Import ngx-translate and the http loader
// ============
import { TranslateLoader,
         TranslateModule,
         TranslatePipe,        
         TranslateStore      } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { ButtonModule        } from 'primeng/button';
import { PasswordModule      } from 'primeng/password';
import { CalendarModule      } from 'primeng/calendar';
import { DialogModule        } from 'primeng/dialog';
import { ToastModule         } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule       } from 'primeng/toolbar';
import { PaginatorModule     } from 'primeng/paginator';
import { ListboxModule       } from 'primeng/listbox';
import { DropdownModule      } from 'primeng/dropdown';
import { DividerModule       } from 'primeng/divider';

// import { TableModule       } from 'primeng/table';
// import { ContextMenuModule } from 'primeng/contextmenu';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { RatingModule      } from 'primeng/rating';
// import { TreeModule        } from 'primeng/tree';
// import { InputTextModule   } from 'primeng/inputtext';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { SpeedDialModule   } from 'primeng/speeddial';
// import { TooltipModule     } from 'primeng/tooltip';

import { InlineSVGModule     } from 'ng-inline-svg-2';


// ================
// Services
// ================
// import { AuthToken             } from '@services/auth-service/token.service';
// import { AuthenticationService } from '@services/auth-service/authentication.service';
import { ConfirmationService,
         MessageService      } from 'primeng/api';
import { HttpService         } from '@services/http-service/http.service';
import { CourseService       } from '@services/course/course.service';
import { DisciplineService   } from '@services/discipline/discipline.service';
import { MembersListService  } from '@services/members/members-list.service';
import { ExamensService      } from '@services/Examens/examens.service';
import { PeriodicityService  } from '@services/periodicity/periodicity.service';
import { SchoolyearService   } from '@services/schoolyear/schoolyear.service';
import { UserService         } from '@services/user.service';
import { ClassroomService    } from '@services/classroom/classroom.service';
import { NotificationService } from '@services/notification/notification.service';


// ================
// Components
// ================
import { ErrorNotificationComponent      } from './error-notification/error-notification.component';
import { SuccessNotificationComponent    } from './success-notification/success-notification.component';
import { DynamicFormQuestionComponent    } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent            } from './dynamic-form/dynamic-form.component';
import { GenericModalDialogComponent     } from './generic-modal-dialog/generic-modal-dialog.component';

import { BtnUpdateDeleteComponent        } from './btn-update-delete/btn-update-delete.component';
import { ScrolltopComponent              } from './scrolltop/scrolltop.component';
import { LogoComponent                   } from './aside/logo/logo.component';
import { AsideMenuComponent              } from './aside/aside-menu/aside-menu.component';
import { AsideFooterComponent            } from './aside/aside-footer/aside-footer.component';
import { FooterComponent                 } from './footer/footer.component';
import { MobileLogoComponent             } from './mobile-logo/mobile-logo.component';
import { NavbarComponent                 } from './navbar/navbar.component';
import { TopbarComponent                 } from './topbar/topbar.component';
import { ToolbarComponent                } from './toolbar/toolbar.component';
import { SharedButtonsComponent          } from './shared-buttons/shared-buttons.component';
import { HeaderSharedComponent           } from './shared-header/shared-header.component';
import { SharedDrawerComponent           } from './shared-drawer/shared-drawer.component';
import { SharedFileUploderComponent      } from './shared-upload-file/shared-file-uploder.component';
import { NavbarLanguageDropdownComponent } from './navbar-language-dropdown/navbar-language-dropdown.component';


// ================
// Directives
// ================
// import { Select2Directive          } from '@directives/select2/select2.directive';


// ================
// Pipes
// ================
import { PipesModule } from 'src/app/pipes/pipes.module';

import * as consts from '@consts/global.consts';
import { CalendarService } from '@services/calendar/calendar.service';


@NgModule({
    declarations: [
        // ==== Components
        DynamicFormQuestionComponent,
        DynamicFormComponent,
        GenericModalDialogComponent,

        ErrorNotificationComponent,
        SuccessNotificationComponent,
        BtnUpdateDeleteComponent,
        ScrolltopComponent,
        LogoComponent,
        AsideMenuComponent,
        AsideFooterComponent,
        FooterComponent,
        MobileLogoComponent,
        NavbarComponent,
        TopbarComponent,
        ToolbarComponent,

        HeaderSharedComponent,
        SharedButtonsComponent,
        SharedDrawerComponent,
        SharedFileUploderComponent,
        NavbarLanguageDropdownComponent,

        // ==== Directives
        // Select2Directive,

        // ==== Pipes
    ],
    providers: [
        // AuthToken,
        // AuthenticationService,
        TranslateStore,

        HttpService,
        NotificationService,
        MessageService,
        ConfirmationService,

        MembersListService,
        ExamensService,
        CourseService,
        UserService,
        SchoolyearService,
        DisciplineService,
        PeriodicityService,
        ClassroomService,
        
    ],
    imports: [
        CommonModule,
        RouterModule,

        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forChild({
            defaultLanguage: localStorage.getItem('language') ?? consts.defaultLangCode,
            loader: {
                provide   : TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps      : [HttpClient]
            }
        }),

        FormsModule,
        ReactiveFormsModule,

        ButtonModule,
        ListboxModule,
        PasswordModule,
        DividerModule,
        CalendarModule,
        DropdownModule,
        DialogModule,


        // TableModule,
        // ContextMenuModule,
        // MultiSelectModule,
        // TreeModule,
        // InputTextModule,
        // ProgressBarModule,
        // ToastModule,
        // SidebarModule,
        // ConfirmDialogModule,
        // TooltipModule,
        // SpeedDialModule,
        // ToolbarModule,
        // PaginatorModule,
        // SplitterModule,

        InlineSVGModule.forRoot(),
    ],
    exports: [
        // ==== Modules
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,

        DialogModule,
        ToolbarModule,
        PaginatorModule,
        CalendarModule,
        ToastModule,
        ConfirmDialogModule,

        // TableModule,
        // PasswordModule,
        // ButtonModule,
        // RatingModule,
        // TreeModule,
        // ListboxModule,
        // MultiSelectModule,
        // InputTextModule,
        // DropdownModule,
        // DividerModule,
        // ProgressBarModule,
        // SplitterModule,

        InlineSVGModule,

        // ==== Pipes
        PipesModule,
        TranslatePipe,

        // ==== Directives
        // Select2Directive,

        // ==== Components
        // DataTableComponent,

        DynamicFormQuestionComponent,
        DynamicFormComponent,
        GenericModalDialogComponent,

        ErrorNotificationComponent,
        SuccessNotificationComponent,

        BtnUpdateDeleteComponent,

        ScrolltopComponent,
        LogoComponent,
        AsideMenuComponent,
        AsideFooterComponent,
        FooterComponent,
        MobileLogoComponent,
        NavbarComponent,
        TopbarComponent,
        ToolbarComponent,

        HeaderSharedComponent,
        SharedButtonsComponent,
        SharedDrawerComponent,
        SharedFileUploderComponent,
    ]
})
export class SharedModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}