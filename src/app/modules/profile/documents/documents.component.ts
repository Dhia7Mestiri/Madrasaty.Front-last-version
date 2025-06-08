import { Component              } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MembersListService     } from '@services/members/members-list.service';
import {UserService             } from '@services/user.service';
import { SchoolDocumentService  } from '@services/schooldocument/school-document.service';
import { NotificationService    } from '@services/notification/notification.service';

import { SchoolDocument         } from '@models/SchoolDocument';
import { UserType } from '@models/UserType';

@Component({
    selector   : 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls  : ['./documents.component.scss']
})
export class DocumentsComponent
{
    displayModal: boolean;
    position: string;
    MoutounPoemeForm: FormGroup;
    membersRole
    uploadedFiles: any[] = [];
    selectedRoles
    schoolId
    items
    docsList = [];
    itemDocument
    itemDocumentId
    DialogTitle
    schoolDoc
    pagenumber = 1
    displayMaximizable: boolean;
    itemDocumentName
    PopHeader
    fileURL

    constructor(private memberService: MembersListService,
        private formBuilder: FormBuilder, private userService: UserService,
        private schoolDocumentService: SchoolDocumentService,
        private notification: NotificationService)
    { }

    ngOnInit()
    {
        this.items = [
            { icon: 'pi pi-pencil', command: () => { this.OpenDialog(this.itemDocumentId) } },
            { icon: 'pi pi-trash', command: () => { this.DeleteDocument('top', this.itemDocumentId) } },
            { icon: 'pi pi-eye', command: () => { this.openDocment(this.itemDocument, this.itemDocumentName) } },
            { icon: 'pi pi-upload', command: () => { this.openDocment(this.itemDocument, this.itemDocumentName) } }
        ];

        this.schoolId = this.userService.getMemberSchoolId();
        this.membersRole = Object.keys(UserType).map(key => ({ label: key, value: UserType[key] })); 

        this.MoutounPoemeForm = this.formBuilder.group({
            Id: [0],
            Roles: [],
            DocumentPath: [],
            SchoolId: [],
        });
        this.GetSchoolDocsList(this.pagenumber);
    }

    GetDocExtensionAndSetTheIcon(item)
    {
        var file_ext = /[^.]+$/.exec(item.DocumentPath).toString();
        switch (file_ext) {
            case 'csv':
                item['style'] = "csv.png"
                break;
            case 'xlsx':
                item['style'] = "excel.png"
                break;
            case 'pdf':
                item['style'] = "pdf.svg"
                break;
            case 'pptx':
            case 'ppt':
                item['style'] = "powerpoint.png"
                break;
            case 'docx':
                item['style'] = "word.png"
                break;
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'tiff':
            case 'gif':
                item['style'] = "image.png"
                break;
            case 'txt':
                item['style'] = "text.png"
                break;
            default:
                item['style'] = "doc.svg"
        }
    }

    GetSchoolDocsList(pagenumber)
    {
        this.schoolDocumentService.getSchoolDocuments(1,pagenumber).subscribe((data) => {
            this.docsList = data['Items']
            if (data?.Items)
            {
                data.Items.map((item) => {
                    this.GetDocExtensionAndSetTheIcon(item)
                });    
            }
        });
    }


    OpenDialog(id: number)
    {
        this.displayModal = true;
        this.DialogTitle = id === -1 ? 'Ajouter Documents' : 'modifier Documents';
        this.schoolDocumentService.getSchoolDocument(id)
            .subscribe({
                next: (schoolDocument: SchoolDocument) => this.displayschoolDocument(schoolDocument),
                error: err => console.log(err)
            });
    }

    displayschoolDocument(schoolDocument: SchoolDocument)
    {
        if (this.MoutounPoemeForm) {
            this.MoutounPoemeForm.reset();
        }
        this.schoolDoc = schoolDocument
        this.MoutounPoemeForm.patchValue({
            Id: this.schoolDoc.Id,
            DocumentPath: this.schoolDoc.DocumentPath,
            Roles: this.schoolDoc.Roles.split(",").map(Number),
            SchoolId: this.schoolDoc.SchoolId
        });
    }

    selectRoles(arg)
    {
        this.selectedRoles = arg.value.toString();
    }

    selectRolesForSearch(arg)
    {
        this.selectedRoles = arg.value.sort(function (a, b) {
            return a - b;
        });
        this.selectedRoles = this.selectedRoles.toString();
        this.schoolDocumentService.getFiltredSchoolDocument(this.selectedRoles).subscribe(data => {
            this.docsList = data
            data.map((item) => {
                this.GetDocExtensionAndSetTheIcon(item);
            });
        });
    }

    myUploader(event)
    {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.notification.showInfo('Files ready to Upload');
    }

    saveSchoolDocuments()
    {
        const formData = new FormData();
        this.uploadedFiles.forEach((file) => { formData.append('files', file); });
        const Model = { SchoolId: this.schoolId, Roles: this.selectedRoles };
        formData.append('Model', JSON.stringify(Model));
        this.schoolDocumentService.createSchoolDocument(formData).subscribe({
            next: () => { this.displayModal = false, this.GetSchoolDocsList(this.pagenumber), this.notification.showSuccess("Documents Uploaded successfully") },
            error: err => err
        });
    }

    clearFiles()
    {
        this.uploadedFiles = [];
    }

    ResetForm()
    {
        this.MoutounPoemeForm.reset();
    }

    openDocment(document, name)
    {
        var docExt = /[^.]+$/.exec(document).toString();
        this.fileURL = this.schoolDocumentService.GetSchoolDocPath(document);

        if (document != null)
        {
            if (docExt !== "pdf" && docExt !== "txt" && docExt != "jpeg" && docExt !== "jpg" && docExt !== "jpeg" && docExt != "png" && docExt !== "tiff" && docExt !== "gif") {
                this.notification.showInfo("votre Document a été bien téléchargeé");
                window.open(this.fileURL, '_self');
            } else {
                this.displayMaximizable = true;
                this.PopHeader = name;
            }
        }
        else {
            this.notification.showInfo("Aucun fichier à ouvrir");
        }
    }

    paginate(event)
    {
        this.pagenumber = event.page + 1
        this.GetSchoolDocsList(this.pagenumber);
    }

    click(event)
    {
        this.itemDocumentId = event.Id;
        this.itemDocument = event.DocumentPath;
        this.itemDocumentName = event.Wording;
    }

    async DeleteDocument(position: string, id)
    {
        this.position = position;
        if (await this.notification.deleteElementAlert())
        {
            this.schoolDocumentService.deleteSchoolDocument(id)
                .subscribe({
                    next: () => { this.notification.showInfo("votre Document a été bien suprimée "), this.GetSchoolDocsList(this.pagenumber) },
                    error: err => { }
                });
        }
    }
}