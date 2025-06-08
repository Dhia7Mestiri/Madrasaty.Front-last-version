import { Component, OnInit   } from '@angular/core';
import { FormGroup           } from '@angular/forms';
// import { GridOptions      } from 'ag-grid-community';

import { SchoolyearService   } from '@services/schoolyear/schoolyear.service';
import { NotificationService } from '@services/notification/notification.service';
import { ExcelUploadService  } from '@services/execlUpload/excel-upload.service';
import { UserService         } from '@services/user.service';

import { SchoolYear          } from '@models/schoolyear';
import { etat                } from '@models/etat';

@Component({
    selector   : 'app-school-year',
    templateUrl: './school-year.component.html',
    styleUrls  : ['./school-year.component.scss']
})
export class SchoolYearComponent implements OnInit
{
    schoolYears: SchoolYear[];
    errorMessage: string;
    schoolYear: SchoolYear;
    columnDefs
    rowData
    domLayout: string;
    // gridOptions: GridOptions;
    paginationPageSize: number;
    localeText;
    editType: string;
    editingRowIndex: any;
    gridColumnApi;
    gridApi;
    switchbtn: boolean = false;
    search = "";
    DialogTitle: string;
    schoolYearForm: FormGroup;
    first = 0;
    pagenumber = 1
    SchoolIdUser
    rows = 10;
    message
    SchoolYearsCount

    constructor(private notification: NotificationService, private uploadExcelservice: ExcelUploadService,
        private schoolyearService: SchoolyearService, private userservice: UserService,
    )
    { }

    ngOnInit()
    {
        this.schoolYearForm = this.schoolyearService.createSchoolYearForm();
        this.SchoolIdUser   = this.userservice.getMemberSchoolId();
        this.schoolyearService.getSchoolYearsCount(this.SchoolIdUser).subscribe(data => this.SchoolYearsCount = data);
        this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search);
    }

    searchResult(data)
    {
        this.search = data;
        this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search);
    }

    OpenDiag(id: number)
    {
        this.DialogTitle = id == -1 ? "Ajouter année scolaire" : "Modifier année scolaire";
        this.schoolyearService.getSchoolYear(id)
            .subscribe({
                next: (schoolYear: SchoolYear) => { this.displaySchoolYears(schoolYear), console.log(schoolYear) },
                error: err => console.log(err)
            });
    }

    displaySchoolYears(schoolYear: SchoolYear)
    {
        if (this.schoolYearForm)
        {
            this.schoolYearForm.reset();
        }

        this.schoolYear = schoolYear;
        this.schoolYearForm.patchValue({
            Name: this.schoolYear.Name,
            StartDate: new Date(this.schoolYear.StartDate),
            EndDate: new Date(this.schoolYear.EndDate),
            Recurrence: this.schoolYear.Recurrence,
            SchoolId: this.schoolYear.SchoolId
        });
    }

    getActive(key)
    {
        return etat[key];
    }

    refreshSchoolYearList(schoolId, pagenumber, search)
    {
        this.schoolyearService.getSchoolYears(schoolId, pagenumber, search)
            .subscribe(
            {
                next: schoolYearList =>
                {
                    this.rowData = schoolYearList
                    this.rowData.map((item) => {
                        item.Actif = new Date(new Date(item.StartDate).toJSON().slice(0, 10)) < new Date() && new Date(new Date(item.EndDate).toJSON().slice(0, 10)) > new Date()
                    });

                    if (schoolYearList.length == 0)
                    {
                        this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
                    }
                },
                error: err => this.errorMessage = err
            });
    }

    setActifSchoolYear(Id: number)
    {
        this.schoolyearService.UpdateActifAnneeScolaire(Id).subscribe({
            next: (data: SchoolYear[]) => { this.notification.showSuccess("Modification de l'année scolaire en cours avec succès"), this.schoolyearService.setRefreshrequired(data); this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search) },
            error: err => this.errorMessage = err
        })
    }

    async deleteItem(id: number)
    {
        if (await this.notification.deleteElementAlert())
        {
            this.schoolyearService.deleteSchoolYear(id)
                .subscribe({
                    next: () => { this.notification.showInfo("votre Année scolaire a bien été supprimée "), this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search) },
                    error: err => this.errorMessage = err
                });
        }
    }

    saveSchoolYear()
    {
        if (!this.schoolYearForm.valid) {
            this.notification.showError('Please correct the validation errors.');
            return;
        }

        if (!this.schoolYearForm.dirty) {
            return;
        }

        const year = { ...this.schoolYear, ...this.schoolYearForm.value };
        year.SchoolId = this.SchoolIdUser
        if (year.Id === 0) {
            this.schoolyearService.createSchoolYear(year).subscribe({
                next: () => { this.notification.showSuccess(" votre Année  scolaire  a bien été ajoutée"), this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search) },
                error: err => this.notification.showError(err)
            });
        } else {
            this.schoolyearService.updateSchoolYear(year)
                .subscribe({
                    next: () => { this.notification.showSuccess(" votre Année  scolaire  a bien été modifiée"), this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search) },
                    error: err => this.notification.showError(err)
                });
        }
    }

    paginate(event)
    {
        this.pagenumber = event.page + 1;
        this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search);
    }

    uploadFile(file)
    {
        let formData = new FormData();
        formData.append('upload', file);

        this.uploadExcelservice.UploadExcel(formData, 'AnneeScolaires/UploadExcel').subscribe(result => {
            this.message = result.toString();
            this.notification.showSuccess(this.message)
            this.refreshSchoolYearList(this.SchoolIdUser, this.pagenumber, this.search);
        });
    }
}