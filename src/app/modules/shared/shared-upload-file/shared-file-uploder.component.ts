import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector   : 'app-shared-file-uploder',
    templateUrl: './shared-file-uploder.component.html',
    styleUrls  : ['./shared-file-uploder.component.scss']
})
export class SharedFileUploderComponent
{
    @Output() btnUploadClick = new EventEmitter();
    @ViewChild('fileInput') fileInput;

    constructor()
    { }

    onUploadClick()
    {
        this.btnUploadClick.emit(this.fileInput.nativeElement.files[0]);
    }
}