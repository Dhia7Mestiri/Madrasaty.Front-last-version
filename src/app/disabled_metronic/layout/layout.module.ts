import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NgbDropdownModule,
//          NgbProgressbarModule,
//          NgbTooltipModule     } from '@ng-bootstrap/ng-bootstrap';

// import { TranslateModule      } from '@ngx-translate/core';
// import { TranslationModule    } from '@modules/i18n';
// import { LayoutRoutingModule  } from './layout-routing.module';
import { SharedModule         } from '@modules/shared/shared.module';
import { ExtrasModule         } from '../partials/layout/extras/extras.module';
import { DrawersModule,
         DropdownMenusModule,
         ModalsModule         } from '../partials/_index';

import { SchoolService        } from '@services/school/school.service';

import { LayoutComponent      } from './layout.component';
import { AsideComponent       } from './components/aside/aside.component';
import { HeaderComponent      } from './components/header/header.component';
import { ContentComponent     } from './components/content/content.component';
import { FooterComponent      } from './components/footer/footer.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent     } from './components/toolbar/toolbar.component';
import { AsideMenuComponent   } from './components/aside/aside-menu/aside-menu.component';
import { TopbarComponent      } from './components/topbar/topbar.component';
import { PageTitleComponent   } from './components/header/page-title/page-title.component';
import { HeaderMenuComponent  } from './components/header/header-menu/header-menu.component';

@NgModule({
    declarations: [
        LayoutComponent,
        AsideComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        ScriptsInitComponent,
        ToolbarComponent,
        AsideMenuComponent,
        TopbarComponent,
        PageTitleComponent,

        HeaderMenuComponent,
    ],
    imports: [
        CommonModule,
        // LayoutRoutingModule,
        // TranslationModule,
        // TranslateModule,
        // InlineSVGModule,
        // NgbDropdownModule,
        // NgbProgressbarModule,
        // NgbTooltipModule,
        ExtrasModule,
        ModalsModule,
        DrawersModule,
        DropdownMenusModule,

        SharedModule,
    ],
    providers: [SchoolService],
    exports: [FooterComponent],
})
export class LayoutModule { }