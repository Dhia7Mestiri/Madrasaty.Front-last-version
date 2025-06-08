import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';

import { DialogModule          } from 'primeng/dialog';
import { FileUploadModule      } from 'primeng/fileupload';
import { MultiSelectModule     } from 'primeng/multiselect';
import { DropdownModule        } from 'primeng/dropdown';
import { ProgressBarModule     } from 'primeng/progressbar';
import { ProfileRoutingModule  } from './profile-routing.module';
import { DataModule            } from '@modules/data/data.module';
import { SharedModule          } from '@modules/shared/shared.module';


import { SchoolDocumentService } from '@services/schooldocument/school-document.service';

import { ProjectsComponent     } from './projects/projects.component';
import { DocumentsComponent    } from './documents/documents.component';
import { ProfileComponent      } from './profile.component';
import { ConnectionsComponent  } from './connections/connections.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProjectsComponent,
        DocumentsComponent,
        ConnectionsComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        ProfileRoutingModule,
        FileUploadModule,
        //  DropdownMenusModule,
        ProgressBarModule,
        DropdownModule,
        DataModule,
        MultiSelectModule,
        SharedModule,
    ],
    providers: [
        SchoolDocumentService,
    ]
})
export class ProfileModule { }