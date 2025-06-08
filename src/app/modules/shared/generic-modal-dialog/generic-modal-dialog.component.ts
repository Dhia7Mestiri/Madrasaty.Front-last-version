import { Component, EventEmitter,
         Input, Output, ViewChild,
         OnDestroy                } from '@angular/core';
import { Dialog                   } from 'primeng/dialog';
import { Subscription             } from 'rxjs';

import { NotificationService      } from '@services/notification.service';
import { Page                     } from '@enums/page';
import { SaveButtonAction         } from '@enums/save-button-action';

@Component({  
    selector   : 'app-generic-modal-dialog',
    templateUrl: './generic-modal-dialog.component.html',
    styleUrls  : ['./generic-modal-dialog.component.scss']
})
export class GenericModalDialogComponent implements OnDestroy
{
    @ViewChild('dlg') dlg !: Dialog;

    @Input() modalTitle   !: string;
    @Input() showModal         = false;
    @Output() showModalChange  = new EventEmitter<boolean>();
    @Input() page             !: Page;
    @Input() saveAction       !: SaveButtonAction;
    @Input() nextButtonCaption = "Suivant";
    @Input() backButtonCaption = "Précédent";
    @Input() saveButtonCaption = "Créer ce compte";
    @Input() stepsCount        = 4;
    currentStep                = 1;
    stepChanged               !: Subscription;

    constructor(private notif: NotificationService)
    { }

    ngOnInit()
    {
        if (this.stepsCount > 1)
            this.listenToStepChange();
    }

    private listenToStepChange()
    {
        // Update stepper index, if/when asked to:
        this.stepChanged = this.notif.stepChanged$.subscribe((stepIndex: number) =>
        {
            if (this.currentStep != stepIndex)
                this.currentStep = stepIndex;
        });
    }

    onHide()
    {
        this.showModalChange.emit(false);
        this.notif.resetForm();
        this.resetParams();
    }

    resetParams()
    {
        if (this.stepsCount <= 1)
            return;

        this.currentStep = 1;
        this.notif.gotoStep(this.currentStep);
    }

    gotoPreviousStep(event: Event)
    {
        if (this.stepsCount == 1)
        {
            this.dlg.close(event);
            return;
        }

        if (this.currentStep == 1)
            return;

        this.currentStep--;
        this.notif.gotoStep(this.currentStep);
    }

    gotoNextStep()
    {
        if (this.currentStep == this.stepsCount)
            return;

            this.currentStep++;
            this.notif.gotoStep(this.currentStep);
    }

    submit(event: Event)
    {
        if (this.saveAction == SaveButtonAction.None)
            return false;

        this.notif.modalSaveBtnClicked({
            page  : this.page,
            action: this.saveAction
        });
        this.dlg.close(event);

        return false;
    }

    ngOnDestroy()
    {
        this.stepChanged?.unsubscribe();
    }
}