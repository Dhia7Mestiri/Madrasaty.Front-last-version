import { NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';

import { MembersRoutingModule   } from './members-routing.module';
import { ProgressBarModule      } from 'primeng/progressbar';
import { SharedModule           } from '@modules/shared/shared.module';
import { DataModule             } from '@modules/data/data.module';

import { EditMemberComponent    } from './edit-member/edit-member.component';
import { ListMembersComponent   } from './list-members/list-members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent       } from './members.component';


@NgModule({
    declarations: [
        MembersComponent,
        EditMemberComponent,
        ListMembersComponent,
        MemberDetailsComponent,
    ],
    imports: [
        CommonModule,
        MembersRoutingModule,
        ProgressBarModule,

        SharedModule,
        DataModule,
    ]
})
export class MembersModule { }