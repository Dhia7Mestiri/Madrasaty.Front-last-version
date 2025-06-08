import { ChangeDetectorRef, Component, OnInit          } from '@angular/core';
import { FormGroup                  } from '@angular/forms';
import { MessageService             } from 'primeng/api';

import { UserService                } from '@services/user.service';
import { MembersListService         } from '@services/members/members-list.service';
import { EvaluationDetailleeService } from '@services/evaluation-detaillee/evaluation-detaillee.service';
import { TajwidErrorService         } from '@services/tajwid-error/tajwid-error.service';
import { NotificationService        } from '@services/notification/notification.service';

import { NotificationService   as NT     } from '@services/notification.service';

import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ColumnsService } from '@services/columns/columns.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';

@Component({
    selector   : 'app-tasmii-historiques',
    templateUrl: './tasmii-historiques.component.html',
    styleUrls  : ['./tasmii-historiques.component.scss'],
})
export class TasmiiHistoriquesComponent implements OnInit
{


    columns     = this.columnsSrv.getTasmiisColumns();
    pageTitle   = 'Tasmii';
    page        = Page.Tasmii;
    permissions = [Permission.ViewTasmiis];
    urlParams   = 'schoolId=1';
    private subscription!: Subscription;



    
     surahList = []
    tasmiitDialog: boolean;
    Tasmiis: any[];
    LearningErrorsByRecitation
    TajwidErrorsByRecitation
    submitted: boolean;
    max = 5;
    teachers
    students = [];
    TasmiiRecitaionsSessions
    SearchForm: FormGroup;
    _originalFormData
    EvaluationDates
    TasmiiForm: FormGroup;
    studentId
    currentRecitationDetail
    tajwidErrorData 

    constructor(private notification: NotificationService, private userService: UserService,
        private tajwidErrorService: TajwidErrorService,
        private memberService: MembersListService, private messageService: MessageService,
        private evaluationDetailleeService: EvaluationDetailleeService,
        
        private columnsSrv: ColumnsService, private notif: NT,
        private perm: PermissionsService, private router: Router,
        private changeDetector: ChangeDetectorRef
        )
    { }

    ngOnInit()
    {
         this.TasmiiForm = this.evaluationDetailleeService.createTasmiiHistoriqueEvaluationForm();
        this.SearchForm = this.evaluationDetailleeService.createSearchForm();
        this._originalFormData = this.SearchForm.value;
        var schoolId = this.userService.getMemberSchoolId();
        this.memberService.getTeachersBySchoolId(schoolId).subscribe(data => this.teachers = data);
        this.memberService.getStudentsBySchoolId(schoolId).subscribe(data => this.students = data);
        this.evaluationDetailleeService.getSurah().subscribe(data => this.surahList = data);
        this.evaluationDetailleeService.getTasmiiecitaionsSessions().subscribe(data => this.TasmiiRecitaionsSessions = data);
        this.evaluationDetailleeService.getTasmiiEvaluationDates().subscribe(data => this.EvaluationDates = data);
        this.tajwidErrorService.getTajwidErrors().subscribe(TajwidErrorData => { this.tajwidErrorData = TajwidErrorData });
        this.submitFilter();

 

        if (!this.grantedAccess())
        return;

    this.notif.updatePageTitle({
        title     : this.pageTitle,
        toggleView: true,
        orderBy   : true,
        breadcrumb: [
            { text: this.pageTitle, url: '/tasmiis' },
        ],
        actionsBtn: [
           
        ]
    });

    }
private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }

    ngAfterContentChecked()
    {
        this.changeDetector.detectChanges();
    }

     paginate(event)
    {
        this.SearchForm.get('PageNumber').setValue(event.page + 1);
        this.submitFilter();
    }

    displayRecitationDetail(recitationDetail)
    {
        this.TasmiiForm.patchValue({
            Id: recitationDetail.Id,
            Surah: recitationDetail.Surah,
            VerseDebut: recitationDetail.VerseDebut,
            VerseFin: recitationDetail.VerseFin,
            Remarques: recitationDetail.Remarques,
            Rating: recitationDetail.Rating,
            StudentId: recitationDetail.StudentId,
            TeacherId: recitationDetail.TeacherId,
            RecitationId: recitationDetail.RecitationId,
            DateEvaluation: recitationDetail.DateEvaluation
        });
    }


    getErrors(item)
    {
        this.evaluationDetailleeService.getExistingLearningErrors(item.Id).subscribe((data) => {
            this.LearningErrorsByRecitation = data
        });
        this.evaluationDetailleeService.getRecitationTajwidErrors(item.Id).subscribe((data) => {
            this.TajwidErrorsByRecitation = data
        });
    } 
    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
     submitFilter()
    {
        const searchData = { ...this.SearchForm.value };
        this.evaluationDetailleeService.SearchTasmii(searchData.PageNumber, searchData.StudentId, searchData.TeacherId, searchData.evaluationDate, searchData.RecitationId).subscribe(data => {
            this.Tasmiis = data
            if (data.length == 0) {
                this.messageService.add({ severity: 'info', summary: 'Info', detail: "il n'y a pas de données disponibles avec ces paramètres !", sticky: true });
            }
        });
    } 

     ResetForm()
    {
        this.SearchForm.reset(this._originalFormData);
    }
 
     getErrorLearningList(codes)
    {
        var array: [] = codes.split(",");
        let tajwiderrorlist: Array<any> = [];
        array.forEach(item => {
            tajwiderrorlist.push(item)
        });
        return tajwiderrorlist;
    }

    getErrorName(codes, errorCategory)
    {
        var array: [] = codes.split(",");
        let tajwiderrorName: Array<any> = [];
        array.forEach(item => {
            var code = this.getchildName(errorCategory, item);
            tajwiderrorName.push(code);
        });
        return tajwiderrorName;
    }

    getchildName(Categoryname, childCode)
    {
        var target = this.tajwidErrorData?.find(x => x.name == Categoryname);
        var Childname = target?.children?.find(x => x.code == childCode).name;
        return Childname;
    }

    editItem(item: any)
    {
        this.tasmiitDialog = true;
        this.displayRecitationDetail(item);
        this.studentId = item?.StudentId;
    }

    getValue(code)
    {
        var data = this.surahList?.find(x => x.number == code);
        return data?.name + " | " + data?.englishName;
    }

    getstudentName(Id)
    {
        return this.students?.find(x => x.Id == Id)?.FullName;
    }

    async deleteItem(id)
    {
        if (await this.notification.deleteElementAlert())
        {
            this.evaluationDetailleeService.DeleteRecitationTajwidErrors(id)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre Tasmii Detail a été bien supprimée"), this.submitFilter() },
                    error: err => this.notification.showError(err.error.Message)
                });
        }
    }

    hideDialog()
    {
        this.tasmiitDialog = false;
        this.submitted     = false;
    }

    saveTasmii()
    {
        this.submitted = true;
        const aux = { ... this.currentRecitationDetail, ...this.TasmiiForm.value };
        if (aux.Id !== 0 || aux.Id !== '' || aux.Id !== null)
        {
            this.evaluationDetailleeService.updateTasmiiDetail(aux)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre Tasmii Detail a été bien modifié"), this.submitFilter() },
                    error: err => err
                });
        }
        this.tasmiitDialog = false;
    }
}