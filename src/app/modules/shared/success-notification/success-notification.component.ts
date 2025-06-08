import { Component, Input } from '@angular/core';
import { MessageService   } from 'primeng/api';

@Component({
    selector   : 'app-success-notification',
    templateUrl: './success-notification.component.html',
    styleUrls  : ['./success-notification.component.scss'],
    providers  : [MessageService]
})
export class SuccessNotificationComponent
{
    @Input() title      = 'Succès!';
    @Input() showToastr = true;

    constructor(private messageService: MessageService)
    { }

    show(msg: string)
    {
        const title = this.title;
        if (this.showToastr)
            this.messageService.add({severity:'success', summary: title, detail: msg});
    }
}