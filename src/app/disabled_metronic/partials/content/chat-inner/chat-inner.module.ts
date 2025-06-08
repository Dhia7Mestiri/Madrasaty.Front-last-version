import { NgModule           } from '@angular/core';
import { CommonModule       } from '@angular/common';
import { ChatInnerComponent } from './chat-inner.component';

@NgModule({
    declarations: [ChatInnerComponent],
    imports     : [CommonModule],
    exports     : [ChatInnerComponent],
})
export class ChatInnerModule { }