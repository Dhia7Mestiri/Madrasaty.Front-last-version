import { Examen } from '@models/examen';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@services/notification.service';
import { NotificationService as NT} from '@services/notification/notification.service';
import { UserService } from '@services/user.service';
import { ColumnsService } from '@services/columns/columns.service';
import { Router } from '@angular/router';
import { Page } from '@enums/page';
import { Permission } from '@enums/permission';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { Subscription } from 'rxjs';
import { IGridRow } from '@interfaces/row';
import { SaveButtonAction } from '@enums/save-button-action';
import { EditExamenComponent } from '../edit-examen/edit-examen.component';
import * as consts from '@consts/url.consts';
import { HttpService } from '@services/http-service/http.service';
@Component({
    selector: 'app-examen-historique',
    templateUrl: './examen-historique.component.html',
    styleUrls: ['./examen-historique.component.scss'],
})
export class ExamenHistoriqueComponent implements OnInit {
    columns = this.columnsSrv.getExamsColumns();
    pageTitle = 'Examens Historique';
    page = Page.Examens;
    permissions = [Permission.ViewExams];
    urlParams = '';
    private subscription!: Subscription;

    examen: Examen;
    modalTitle = '';
    modalIsVisible: boolean;
    saveAction!: SaveButtonAction;
    schoolId: number;
    userId: number;
    @ViewChild('edit') editExamenCmp!: EditExamenComponent;
    constructor(
        private notif: NotificationService,
        private notification: NT,
        private http: HttpService,
        private columnsSrv: ColumnsService,
        private perm: PermissionsService,
        private router: Router,
        private userservice: UserService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.schoolId = this.userservice.getMemberSchoolId();
        this.userId = this.userservice.getMemberId();
        this.urlParams = `schoolId=${this.schoolId}&userId=${this.userId}`;
        if (!this.grantedAccess()) return;
        this.setPageTitle();
    }

    private grantedAccess(): boolean {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess) this.router.navigate(['/']);

        return canAccess;
    }

    ngAfterContentChecked() {
        this.changeDetector.detectChanges();
    }
    setPageTitle() {
        this.notif.updatePageTitle({
            title: this.pageTitle,
            toggleView: false,
            orderBy: true,
            breadcrumb: [
                { text: this.pageTitle, url: '/exams' },
                { text: 'Historique', url: '/exams' },
            ],
            actionsBtn: [
                {
                    text: 'Nouveau Examen',
                    url: 'javascript:;',
                    onClick: () =>this.AddExamen(),
                    cssClass: 'fw-bold btn-primary', // Small button = btn-sm
                },
            ],
        });
    }

/*     editExamen(row: IGridRow) {
        this.saveAction = SaveButtonAction.Edit;
        this.examen = row.data;
        this.modalTitle = 'Modify Examen';
        this.modalIsVisible = true;
        this.editExamenCmp.edit(this.examen);
    }


 */

    buttonType=""
    editExamen(row: IGridRow) {      
       this.buttonType= row?.button       
       if( this.buttonType=="delete"){
          this.deleteExamen(row.data.Id)
       }else{
        this.openModal(SaveButtonAction.Edit, row.data);       

       }

    }
    
    deleteExamen(id: number) {
        this.notification.deleteElementAlert().then((result) => {
            if (result && id != 0) {
          
              this.http.delete(consts.EXAMENS_URL + id)
                    .subscribe({
                        next: () => { this.notification.showSuccess("Votre Examen a été bien supprimée") },
                        error: err => this.notification.showError("Problème au cour de la suppression")
                    }); 
            }
        })
    }


    AddExamen() {
        this.openModal(SaveButtonAction.New,null);
    }
    

    private openModal(action: SaveButtonAction, examen: Examen ) {
        this.saveAction = action;
        this.modalIsVisible = true;
        this.modalTitle = action === SaveButtonAction.New ? 'Add Examen' : 'Modify Examen';
        this.examen = examen;
       this.editExamenCmp.AddEdit(this.examen);
    }

/*     private createExamen() {
        return {        
            Id: 0,
            Name: '',
            SupervisorId: 0,
            StartDate: new Date(),
            EndDate:  new Date(),
            TermId: 0,
            CourseId: 0,
            Coefficient: 0,
            IsDeleted: false,
        };
    }   */
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
