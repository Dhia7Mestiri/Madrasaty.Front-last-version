import { Component, OnInit,
         OnDestroy           } from '@angular/core';
import { Router              } from '@angular/router';
import { Subscription        } from 'rxjs';

import { NotificationService } from '@services/notification.service';
import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';

@Component({
    selector   : 'app-moutouns-list',
    templateUrl: './moutouns-list.component.html',
    styleUrls  : ['./moutouns-list.component.scss']
})
export class MoutounsListComponent implements OnInit, OnDestroy
{
    pageTitle   = "Moutouns";
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     = this.columnsSrv.getMoutounsColumns();
    page        = Page.Moutouns;
    permissions = [Permission.ViewMoutouns];
    urlParams   = 'schoolId=1';
    private subscription!: Subscription;

    // DialogTitle: string;
    // poemeList: any;
    // selectedFile: File;
    // uploading: any;
    // MoutounPoemeForm: FormGroup;
    // uploadProgress: any;
    // submissionResult: any;
    // sortOrder: number;
    // pagenumber = 1;
    // poemeId: number;
    // uploadedFiles: any[] = [];
    // sortField: string;
    // items: any;
    // position: string;
    // displayModal: boolean;
    // moutounPoeme: MoutounPoeme
    // itemDocument: any;
    // itemDocumentName: any;
    // @ViewChild('fileInput') fileInput;
    // displayMaximizable: boolean;
    // fileURL: string;
    // PopHeader: any;
    // SchoolIdUser: any;

    constructor(private columnsSrv: ColumnsService,
        // private notification: NotificationService, private userservice: UserService,
        // private evaluationSimpleService: EvaluationSimpleService,
        private notif: NotificationService,
        private perm: PermissionsService,
        private router: Router)
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.listenToViewChanges();

        this.notif.updatePageTitle({
            title     : this.pageTitle,
            toggleView: true,
            orderBy   : true,
            breadcrumb: [
                { text: this.pageTitle, url: '/moutouns' },
            ],
            actionsBtn: [
                {
                    text: 'New Moutoun',
                    url: '/moutouns/new',
                    modalTarget: 'newMoutoun',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });

        // this.SchoolIdUser     = this.userservice.getMemberSchoolId();
        // this.MoutounPoemeForm = this.evaluationSimpleService.createMoutounPoemeForm();

        // this.items = [
        //     {
        //         icon: 'pi pi-pencil',
        //         command: () => {
        //             this.OpenDialog(this.poemeId)

        //         }
        //     },

        //     {
        //         icon: 'pi pi-trash',
        //         command: () => {
        //             this.DeleteMoutounPoeme('top', this.poemeId)
        //         }
        //     },
        //     {
        //         icon: 'pi pi-eye',
        //         command: () => {
        //             this.openDocment(this.itemDocument, this.itemDocumentName)
        //         }
        //     },
        //     {
        //         icon: 'pi pi-upload',
        //         command: () => {
        //             this.openDocment(this.itemDocument, this.itemDocumentName)
        //         }
        //     },
        // ];

        // this.GetMoutounPoemesList(this.pagenumber);
    }

    listenToViewChanges()
    {
        this.subscription = this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        });
    }

    private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }

    // OpenDialog(id: number)
    // {
    //     this.displayModal = true;
    //     this.DialogTitle = id === -1 ? 'Ajouter Poeme de Moutoun' : 'modifier Poeme de Moutoun';
    //     this.evaluationSimpleService.GetMoutounPoemeById(id)
    //         .subscribe({
    //             next: (moutounPoeme: MoutounPoeme) => this.displayMoutounPoeme(moutounPoeme),
    //             error: err => console.log(err)
    //         });
    // }

    // displayMoutounPoeme(moutounPoeme: MoutounPoeme)
    // {
    //     if (this.MoutounPoemeForm) {
    //         this.MoutounPoemeForm.reset();
    //     }

    //     this.moutounPoeme = moutounPoeme;
    //     this.MoutounPoemeForm.patchValue({
    //         Id: this.moutounPoeme.Id,
    //         Title: this.moutounPoeme.Title,
    //         File: this.moutounPoeme.File,
    //         SchoolId: this.moutounPoeme.SchoolId
    //     });
    // }

    // async DeleteMoutounPoeme(position: string, id)
    // {
    //     this.position = position;
    //     if (await this.notification.deleteElementAlert())
    //     {
    //         this.evaluationSimpleService.DeleteMoutounPoeme(id).subscribe({
    //             next: () => { this.notification.showInfo("votre Poeme de Moutoun a été bien suprimée "), this.GetMoutounPoemesList(this.pagenumber) },
    //             error: err => { }
    //         });
    //     }
    // }

    // ResetForm()
    // {
    //     this.MoutounPoemeForm.reset()
    // }

    // saveMoutoun()
    // {
    //     const data = { ...this.moutounPoeme, ...this.MoutounPoemeForm.value };
    //     data.SchoolId = this.SchoolIdUser;
    //     if (data.Id === 0 || data.Id === "" || data.Id === null)
    //     {
    //         this.uploadFile(data)
    //     }
    //     else
    //     {
    //         this.updateFile(data)
    //     }

    //     this.displayModal = false;
    //     this.ResetForm()
    // }
    // GetMoutounPoemesList(pagenumber)
    // {
    //     this.evaluationSimpleService.getMoutounPoemes(pagenumber).subscribe((poeme) => {
    //         this.poemeList = poeme
    //     });
    // }

    // click(event)
    // {
    //     this.poemeId   = event.Id;
    //     this.itemDocument     = event.File;
    //     this.itemDocumentName = event.Name;
    // }

    // uploadFile(data)
    // {
    //     const formData = new FormData();
    //     formData.append('file', this.fileInput.nativeElement.files[0]);
    //     formData.append('Model', JSON.stringify(data));

    //     this.evaluationSimpleService.createMoutounPoeme(formData).subscribe({
    //         next: (res) => {
    //             this.notification.showSuccess("votre Poeme de Moutoun et son Document ont été bien ajoutés");
    //             this.GetMoutounPoemesList(this.pagenumber);

    //         },
    //         error: err => err
    //     });
    // }

    // openDocment(document, name)
    // {
    //     if (document != null)
    //     {
    //         this.displayMaximizable = true;
    //         this.fileURL   = this.evaluationSimpleService.GetMoutounPoemeDocPath(document);
    //         this.PopHeader = name;
    //     }
    //     else
    //     {
    //         this.notification.showInfo("Aucun fichier à ouvrir");
    //     }
    // }

    // updateFile(data)
    // {
    //     const formData = new FormData();
    //     formData.append('file', this.fileInput.nativeElement.files[0]);
    //     formData.append('Model', JSON.stringify(data));

    //     this.evaluationSimpleService.UpdateMoutounPoeme(data.Id, formData).subscribe({
    //         next: (res) => {
    //             this.notification.showSuccess("votre Poeme de Moutoun et son Document ont été bien modifier");
    //             this.GetMoutounPoemesList(this.pagenumber);
    //         },
    //         error: err => err
    //     });
    // }

    // paginate(event)
    // {
    //     this.pagenumber = event.page + 1
    //     this.GetMoutounPoemesList(this.pagenumber)
    // }

    buttonClicked(obj: any)
    {
        console.log("moutouns-list.component: Moutoun ID = ", obj.item, " -> Button clicked = ", obj.button);
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
}