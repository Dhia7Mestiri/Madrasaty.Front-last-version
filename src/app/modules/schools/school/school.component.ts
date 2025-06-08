/*import { OnInit, ChangeDetectorRef,
         Component, SimpleChange,
         ChangeDetectionStrategy   } from '@angular/core';
import {  FormGroup                } from '@angular/forms';

import { UserService         } from '@services/user.service';
import { SchoolService       } from '@services/school/school.service';
import { NotificationService } from '@services/notification/notification.service';
import { MembersListService  } from '@services/members/members-list.service';
import { ExcelUploadService  } from '@services/execlUpload/excel-upload.service';

import { School              } from '@models/school';
import { getCurrentUser } from '@functions/current-user';


@Component({
    selector       : 'app-school',
    templateUrl    : './school.component.html',
    styleUrls      : ['./school.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolComponent implements OnInit
{
    maxMemberList = 4
    currentSchoolId: number;
    school: School;
    LogoPath
    rowData = []
    result
    defaultCountry: any = 'FR';
    countries;
    switchbtn: boolean = false;
    UpPhoto: any;
    photo: any;
    search = "";
    schoolForm: FormGroup;
    errorMessage = '';
    DialogTitle: string;
    connectedmember
    currentMemberId
    currentMemberStatutId
    currentMemberSchoolId
    message
    pagenumber = 1
    positionLeft = '90px';
    positionTop = '20px';
    marginStyle = { 'margin-left': this.positionLeft, 'margin-top': this.positionTop };
    displayBasic: boolean;
    memberslist

    constructor(private uploadExcelservice: ExcelUploadService, private changeDetector: ChangeDetectorRef,
        private notification: NotificationService, private schoolService: SchoolService, private userService: UserService,
        private memberService: MembersListService)
    { }

    ngOnInit()
    {
        this.schoolForm            = this.schoolService.createSchoolForm();

        const user           = this.userService.UserLoggedIn.id;
        this.currentMemberId = user ;
        this.currentMemberId       = this.userService.getMemberId();
        this.currentMemberStatutId = 1;
        this.currentMemberSchoolId = this.userService.getMemberSchoolId();

        this.refreshSchoolList(this.pagenumber, this.search)

        this.schoolForm.controls['Country'].setValue(this.defaultCountry, { onlySelf: true });
        this.schoolService.getCountries().subscribe(
            (countriesData) => this.countries = countriesData,
            (error) => console.log(error)
        );
    }

    ngAfterContentChecked()
    {
        this.changeDetector.detectChanges();
    }

    getmemberPhotos(Photopath)
    {
        return this.memberService.GetMemberPhotoPath(Photopath);
    }

    getMembersBySchoolId(SchoolId)
    {
        this.memberService.MembersBySchoolId(SchoolId).subscribe((data) => {
            this.result = data;
        });
        return this.result;
    }

    OpenDiag(id: number)
    {
        this.DialogTitle = id == -1 ? "Ajouter école" : "Modifier école";
        this.schoolService.getSchool(id)
            .subscribe({
                next: (school: School) => this.displaySchool(school),
                error: err => console.log(err)
            });
    }

    searchResult(data)
    {
        this.search = data;
        this.refreshSchoolList(this.pagenumber, this.search);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange })
    {
        for (let propName in changes)
        {
            let changedProp = changes[propName];
            this.currentSchoolId = changedProp.currentValue;
            this.DialogTitle = this.currentSchoolId == -1 ? "Ajouter école" : "Modifier école";
            this.getSchool();
        }
    }

    paginate(event)
    {
        this.pagenumber = event.page + 1;
        this.refreshSchoolList(this.pagenumber, this.search);
    }

    getSchool()
    {
        this.schoolService.schoolIdData.subscribe(data => {
            this.currentSchoolId = data;
            this.schoolService.getSchool(this.currentSchoolId)
                .subscribe({
                    next: (school: School) => this.displaySchool(school),
                    error: err => console.log(err)
                });
        })
    }

    displaySchool(school: School)
    {
        if (this.schoolForm) {
            this.schoolForm.reset();
        }

        console.log(school);
        this.school = school;
        this.schoolForm.patchValue({
            Name: this.school.Name,
            Street: this.school.Street,
            City: this.school.City,
            Country: this.school.Country,
            ZipCode: this.school.ZipCode,
            Photo: this.school.Photo,
            SiretCode: this.school.Siret,
            NumTVA: this.school.CodeTVA
        });

        this.LogoPath = this.schoolService.GetSchoolPhotoPath(this.school.Photo);
    }

    saveSchool()
    {
        if (!this.schoolForm.valid)
        {
            this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
        }

        console.log(this.schoolForm.value);
        const sc = { ...this.school, ...this.schoolForm.value };
        if (this.UpPhoto != null && this.UpPhoto != undefined)
        {
            this.photo = this.UpPhoto;
            var array = this.photo.split(",", 3);
            this.photo = array[1];
            sc.Photo = sc.Name + ".jpg";
        }
        else
        {
            this.photo = "";
        }
        let schoolModel = {
            Photo : this.photo,
            School: sc
        };

        if (sc.Id === 0)
        {
            this.schoolService.createSchool(schoolModel)
                .subscribe({
                    next: () => { this.notification.showSuccess(" votre école a  été bien  ajoutée"), this.refreshSchoolList(this.pagenumber, this.search) },
                    error: err => this.notification.showError(
                        "Oops..Le nom de votre école est déjà pris")
                });
        }
        else
        {
            this.schoolService.updateSchool(schoolModel)
                .subscribe({
                    next: () => { this.notification.showSuccess(" votre école a  été bien  modifiée"), this.refreshSchoolList(this.pagenumber, this.search) },

                    error: err => this.notification.showError(
                        "Oops..Le nom de votre école est déjà pris,vous ne pouvez pas changer le nom de l'école ")

                });
        }
    }

    async deleteItem(id: number)
    {
        if (await this.notification.deleteElementAlert())
        {
            this.schoolService.deleteSchool(id)
                .subscribe({
                    next: () => { this.notification.showInfo(" votre école a  été bien  supprimée"), this.refreshSchoolList(this.pagenumber, this.search) },
                    error: err => this.errorMessage = err
                });
        }
    }

    onChange(file: File)
    {
        if (file)
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
                this.UpPhoto = reader.result;
                this.LogoPath = this.UpPhoto;
            };
        }
    }

    refreshSchoolList(pagenumber, search)
    {
        this.schoolService.getSchoolsByPage(pagenumber, search).subscribe({
            next: schools =>
            {
                if (this.currentMemberStatutId === 1)
                {
                    // this.rowData = schools.filter(x=>x.Id==this.currentMemberSchoolId)  
                    this.rowData = schools;
                    this.rowData.map((item => {
                        this.memberService.MembersBySchoolId(item.Id).subscribe((data) => {
                            item.memberslist = data;
                        })
                    }));
                    console.log(this.rowData);
                }
                else
                {
                    this.rowData = schools;
                }
            },
            error: err => this.errorMessage = err
        })
    }

    showBasicDialog(id)
    {
        this.displayBasic = true;
        this.memberService.MembersBySchoolId(id).subscribe((data) => {
            this.memberslist = data;
        });
    }

    uploadFile(file)
    {
        let formData = new FormData();
        formData.append('upload', file);
        this.uploadExcelservice.UploadExcel(formData, 'Schools/UploadExcel').subscribe({
            next: result => { this.message = result.toString(); this.notification.showSuccess(this.message); this.refreshSchoolList(this.pagenumber, this.search) },
            error: err => this.notification.showError(err.error.Message)
        });
    }
}*/