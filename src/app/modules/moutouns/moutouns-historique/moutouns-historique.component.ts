import { ChangeDetectorRef, Component, OnInit      } from '@angular/core';
import { animate, state, style,
         transition, trigger    } from '@angular/animations';
import { NotificationService as NT     } from '@services/notification.service';
import { ColumnsService } from '@services/columns/columns.service';
import { Page                } from '@enums/page';
import { Permission } from '@enums/permission';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { FormGroup } from '@angular/forms';
import { UserService } from '@services/user.service';
import { MembersListService } from '@services/members/members-list.service';
import { EvaluationSimpleService } from '@services/evaluation-simple/evaluation-simple.service';
import { NotificationService } from '@services/notification/notification.service';
@Component({
    selector   : 'app-moutouns-historique',
    templateUrl: './moutouns-historique.component.html',
    styleUrls  : ['./moutouns-historique.component.scss'],
    animations : [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class MoutounsHistoriqueComponent implements OnInit
{
  moutounDialog: boolean;
    currentRecitationDetail
    Moutouns: any[];
    poemeList
    submitted: boolean;
    teachers
    students
    MoutounRecitaionsSessions
    EvaluationDates
    SearchForm: FormGroup;
    moutounForm: FormGroup;
    _originalFormData
    studentId 
    columns     = this.columnsSrv.getMoutounsColumns();
    urlParams   = 'schoolId=1';
    pageTitle   = 'Moutoun Historique';
    page        = Page.Moutouns;
    permissions = [Permission.ViewMoutouns];
    constructor( private columnsSrv: ColumnsService,
        private notif: NT,
        private perm: PermissionsService,
        private router: Router, private changeDetector: ChangeDetectorRef,
        private userService:UserService,
    private memberService:MembersListService,
private evaluationSimpleService:EvaluationSimpleService,
private notification: NotificationService)
        
    { }

    ngOnInit()
    {
         this.moutounForm = this.evaluationSimpleService.createEvaluationMoutounHistoriqueForm();
        this.SearchForm = this.evaluationSimpleService.createMoutounSearchForm();
        this._originalFormData = this.SearchForm.value;
        var schoolId = this.userService.getMemberSchoolId();
        this.memberService.getTeachersBySchoolId(schoolId).subscribe(data => this.teachers = data);
        this.memberService.getStudentsBySchoolId(schoolId).subscribe(data => this.students = data);
        this.evaluationSimpleService.getMoutounRecitaionsSessions().subscribe(data => this.MoutounRecitaionsSessions = data);
        this.evaluationSimpleService.getMoutounEvaluationDates().subscribe(data => this.EvaluationDates = data);
        this.evaluationSimpleService.getAllMoutounPoemes().subscribe(poeme => this.poemeList = poeme);
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
    const canAccess = true;

    if (!canAccess)
        this.router.navigate(["/"]);

    return true;
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

    submitFilter()
    {
        const searchData = { ...this.SearchForm.value };
        this.evaluationSimpleService.SearchMoutouns(searchData.PageNumber, searchData.StudentId, searchData.TeacherId, searchData.evaluationDate, searchData.RecitationId).subscribe(data => {
            this.Moutouns = data;
            if (data.length == 0) {
                this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
            }
        });
    } 

     ResetForm()
    {
        this.SearchForm.reset(this._originalFormData);
    }
    editItem(item: any)
    {
        this.moutounDialog = true;
        this.displayMoutounDetail(item);
        this.studentId = item.StudentId;
    }

    displayMoutounDetail(MoutounDetail)
    {
        this.moutounForm.patchValue({
            Id: MoutounDetail.Id,
            Poeme: MoutounDetail.Poeme,
            VerseDebut: MoutounDetail.VerseDebut,
            VerseFin: MoutounDetail.VerseFin,
            Remarques: MoutounDetail.Remarques,
            Rating: MoutounDetail.Rating,
            StudentId: MoutounDetail.StudentId,
            TeacherId: MoutounDetail.TeacherId,
            RecitationId: MoutounDetail.RecitationId,
            DateEvaluation: MoutounDetail.DateEvaluation
        });
    }

    async deleteItem(id: number)
    {
        if (await this.notification.deleteElementAlert())
        {
            this.evaluationSimpleService.deleteMoutounDetail(id)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre Moutoun Detail a été bien supprimée"), this.submitFilter() },
                    error: err => console.log(err)
                });
        }
    }

    hideDialog()
    {
        this.moutounDialog = false;
        this.submitted     = false;
    }

    saveMoutoun()
    {
        this.submitted = true;
        const aux = { ... this.currentRecitationDetail, ...this.moutounForm.value };
        console.log(aux)
        if (aux.Id !== 0 || aux.Id !== '' || aux.Id !== null) {

            this.evaluationSimpleService.updateMoutounDetail(aux)
                .subscribe({
                    next: () =>
                    {
                        this.notification.showSuccess("Votre Moutoun Detail a été bien modifié");
                        this.submitFilter();
                    },
                    error: err => err
                });
        }
        this.moutounDialog = false;
    }

    getVal(code)
    {
        return this.poemeList?.find(x => x.Id == code)?.Wording;
    }

    getstudentName(Id)
    {
        return this.students?.find(x => x.Id == Id)?.FullName;
    } 
}