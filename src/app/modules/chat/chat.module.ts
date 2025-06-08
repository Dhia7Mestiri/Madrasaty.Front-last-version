import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import {
    DropdownMenusModule,
    ChatInnerModule,
    CardsModule            } from 'src/app/_metronic/partials/_index';
import { SharedModule      } from '@modules/shared/shared.module';

import { ChatComponent        } from '../chat/chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { GroupChatComponent   } from './group-chat/group-chat.component';
import { DrawerChatComponent  } from './drawer-chat/drawer-chat.component';

@NgModule({
    declarations: [
        ChatComponent,
        PrivateChatComponent,
        GroupChatComponent,
        DrawerChatComponent,
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        DropdownMenusModule,
        ChatInnerModule,
        CardsModule,

        SharedModule,
    ],
})
export class ChatModule { }