import { Component, Input } from '@angular/core';
import { MessageService   } from 'primeng/api';

// Import global constants
import * as consts from '@consts/global.consts';

@Component({
    selector   : 'app-error-notification',
    templateUrl: './error-notification.component.html',
    styleUrls  : ['./error-notification.component.scss'],
    providers  : [MessageService]
})
export class ErrorNotificationComponent
{
    @Input() title         = "Erreur";
    @Input() message       = "";
    @Input() showSeparator = false;
    @Input() showToastr    = false;

    constructor(private messageService: MessageService)
    { }

    show(msg: string)
    {
        const title = this.title ?? "Erreur";
        const life  = consts.isProduction ? 3000 : 999000;
        if (this.showToastr)
            this.messageService.add({severity:'error', summary: title, detail: msg, life: life});
    }

    closePanel()
    {
        this.showSeparator = false;
        this.message       = "";
        this.title         = "";
    }
}