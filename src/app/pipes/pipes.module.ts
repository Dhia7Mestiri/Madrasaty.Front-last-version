import { NgModule           } from '@angular/core';
import { CommonModule       } from '@angular/common';

import { SafePipe           } from './Safe/safe.pipe';
import { TruncateHtmlPipe   } from './truncateHtml/truncate-html.pipe';
import { TruncateStringPipe } from './truncateString/truncate-string.pipe';


@NgModule({
    declarations: [
        SafePipe,
        TruncateHtmlPipe,
        TruncateStringPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        TruncateStringPipe,
        SafePipe,
        TruncateHtmlPipe
    ]
})
export class PipesModule { }