import { Injectable      } from '@angular/core';
import { Subject         } from 'rxjs';

import { IPage           } from '@interfaces/page';
import { IRequest        } from '@interfaces/request';
import { IGridRow        } from '@interfaces/row';
import { IMessage        } from '@interfaces/message';
import { ISaveButtonData } from '@interfaces/save-button-data';
import { IUser           } from '@interfaces/user';
// import { IEvent       } from '@interfaces/event';
// import { IOptions     } from '@interfaces/options';

@Injectable({
    providedIn: 'root'  // Provides service in AppModule
})
export class NotificationService
{
    // ==========================
    // Observable sources
    // ==========================
    // private optionsRequestedSource = new Subject<number>();
    // private optionsUpdatedSource   = new Subject<IOptions>();

    private pageChangedSource         = new Subject<IPage>();
    private viewChangedSource         = new Subject<boolean>();
    private languageChangedSource     = new Subject<string>();
    //private loginChangedSource        = new Subject<IUser | null>();
    private rowSelectedSource         = new Subject<IGridRow>();
    private rowModifiedSource         = new Subject<IGridRow>();
    private rowDeletedSource          = new Subject<IGridRow>();
    private rowAddedSource            = new Subject<IGridRow>();
    
    //private changeFluiditySource      = new Subject<boolean>();
    //private darkModeChangedSource     = new Subject<boolean>();
    private requestChangedSource      = new Subject<IRequest>();
    private stepChangedSource         = new Subject<number>();
    private modalSaveBtnClickedSource = new Subject<ISaveButtonData>();
    private newToastrSource           = new Subject<IMessage>();
    private resetFormSource           = new Subject<void>();
    private newRoleModalSource        = new Subject<void>();


    // ==========================
    // Observable string streams
    // ==========================
    // optionsRequested$ = this.optionsRequestedSource.asObservable();
    // optionsUpdated$   = this.optionsUpdatedSource.asObservable();

    darkModeChanged$     = new Subject<boolean>();
    viewChanged$         = this.viewChangedSource.asObservable();
    languageChanged$     = this.languageChangedSource.asObservable();
    pageChanged$         = this.pageChangedSource.asObservable();
    loginStatusChanged$  = new Subject<IUser | null>() ;
    rowSelected$         = this.rowSelectedSource.asObservable();
    rowAdded$            = this.rowAddedSource.asObservable();
    rowModified$         = this.rowModifiedSource.asObservable();
    rowDeleted$          = this.rowDeletedSource.asObservable();
    fluidityChanged$     = new Subject<boolean>() ;
    requestChanged$      = this.requestChangedSource.asObservable();
    stepChanged$         = this.stepChangedSource.asObservable();
    onNewToastr$         = this.newToastrSource.asObservable();
    modalHidden$         = this.resetFormSource.asObservable();
    modalSaveBtnClicked$ = this.modalSaveBtnClickedSource.asObservable();
    newRoleModal$        = this.newRoleModalSource.asObservable();
    gridButtonClicked$: any;


    // ==========================
    // Service message commands
    // ==========================
    // Reserved for future use
    // saveOptions(newOptions: IOptions) { this.optionsUpdatedSource.next(newOptions); }

    loginChanged(user: IUser | null)
    {
        this.loginStatusChanged$.next(user);
    }

    updateView(isTableView: boolean)
    {
        this.viewChangedSource.next(isTableView);
    }

    updateLanguage(newLanguage: string)
    {
        this.languageChangedSource.next(newLanguage);
    }

    updatePageTitle(newTitle: IPage)
    {
        this.pageChangedSource.next(newTitle);
    }

    updateDarkMode(isDarkMode: boolean)
    {
        this.darkModeChanged$.next(isDarkMode);
    }

    rowSelected(row: any)
    {
        this.rowSelectedSource.next(row);
    }

    saveRow(row: IGridRow)
    {
        this.rowModifiedSource.next(row);
    }

    addRow(row: IGridRow)
    {
        this.rowAddedSource.next(row);
    }

    deleteRow(row: IGridRow)
    {
        this.rowDeletedSource.next(row);
    }

    showToastr(message: IMessage)
    {
        this.newToastrSource.next(message);
    }

    resetForm()
    {
        this.resetFormSource.next();
    }

    modalSaveBtnClicked(buttonData: ISaveButtonData)
    {
        this.modalSaveBtnClickedSource.next(buttonData);
    }

    gotoStep(stepIndex: number)
    {
        this.stepChangedSource.next(stepIndex);
    }

    requestChanged(request: IRequest)
    {
        this.requestChangedSource.next(request);
    }

    newRoleModal()
    {
        this.newRoleModalSource.next();
    }
}