import { Component, ElementRef,
         EventEmitter, Input,
         OnInit, Output,
         ViewChild           } from '@angular/core';
import { FormGroup           } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpService         } from '@services/http-service/http.service';
import { NotificationService } from '@services/notification/notification.service';
import { ExamensService      } from '@services/Examens/examens.service';
import { Examen              } from '@models/examen';
import { Page                } from '@enums/page';
import * as urlconsts from '@consts/url.consts';
import * as consts from '@consts/global.consts';

@Component({
    selector   : 'app-examens',
    templateUrl: './examens.component.html',
    styleUrls  : ['./examens.component.scss']
})
export class ExamensComponent implements OnInit
{
    @Input() Course
    @Input() TermId
    @Input() terms
    @Input() teachersList

    ExamensByCourse
    CourseId: number;
    examen: Examen
    page  = Page.Examens;
    modalIsVisible = false;
    pagenumber = 1;
    ExamenForm: FormGroup;
    DialogTitle = "";
    @Output() BtnDeleteClick = new EventEmitter();
    @Output() BtnEditClick = new EventEmitter();
    @ViewChild('modalCloseBtn') private modalCloseBtn: ElementRef;

    constructor(private http: HttpService, private examenService: ExamensService, private notification: NotificationService)
    { }

    ngOnInit()
    {
        this.CourseId = this.Course.Id
        this.ExamenForm = this.examenService.createExamenForm()
        this.GetExamensByCourseIdAndTermId(this.pagenumber, this.CourseId, this.TermId)
    }


    onDeleteClick($event) {
        this.BtnDeleteClick.emit($event);
    }
    onEditClick($event) {
        this.BtnEditClick.emit($event);
    }
    GetExamensByCourseIdAndTermId(pagenumber, CourseId, TermId) {
        this.http.read(urlconsts.EXAMENS_URL + "ExamensByCourseId" + "?_pageNumber=" + pagenumber + "&CourseId=" + CourseId + "&TermId=" + TermId, false).subscribe(data => {
            data.map(item => {
                //  item['Supervisor']= this.findTeacher(item['SupervisorId'])
                // item['Course']=  this.courseData.Name
            })
            this.ExamensByCourse = data
        })
    }


    deleteExamen(id: number) {
        this.notification.deleteElementAlert().then((result) => {
            if (result && id != 0) {
                this.http.delete(urlconsts.EXAMENS_URL + id)
                    .subscribe({
                        next: () => { this.notification.showSuccess("Votre Examen a été bien supprimée"), this.GetExamensByCourseIdAndTermId(this.pagenumber, this.CourseId, this.TermId) },
                        error: err => this.notification.showError("Problème au cour de la suppression")
                    });
            }
        })
    }

    OpenDiag(id: number) {
        this.DialogTitle = id === -1 ? 'Ajouter Examen' : 'Modifier Examen';
        this.modalIsVisible = true;
        this.examenService.getExamenById(id)
            .subscribe({
                next: (examen: Examen) => this.displayExamen(examen),
                error: err => console.log(err)
            });

    }
    saveExamen(): void {
        if (this.ExamenForm.valid) {
            if (this.ExamenForm.dirty) {
                this.ExamenForm.get('CourseId').setValue(this.CourseId)
                const aux = { ...this.examen, ...this.ExamenForm.value };
                aux.StartDate = new Date(aux.StartDate + 'Z')
                aux.EndDate = new Date(aux.EndDate + 'Z')
                if (aux.Id === 0 || aux.Id === '' || aux.Id === null) {
                    this.examenService.createExamen(aux)
                        .subscribe({
                            next: () => { this.notification.showSuccess("Votre Examen a été bien ajouté "), this.modalCloseBtn.nativeElement.click(), this.GetExamensByCourseIdAndTermId(this.pagenumber, this.CourseId, this.TermId) },
                            error: err => this.notification.showError('Please correct the validation errors.')
                        });

                } else {
                    this.examenService.updateExamen(aux)
                        .subscribe({
                            next: () => { this.notification.showSuccess("Votre Examen a été bien  modifié "), this.modalCloseBtn.nativeElement.click(), this.GetExamensByCourseIdAndTermId(this.pagenumber, this.CourseId, this.TermId) },
                            error: err => this.notification.showError('Please correct the validation errors.')
                        });
                }
            }
        } else {
            this.notification.showError('Please correct the validation errors.');
        }
    }
    displayExamen(examen: Examen): void {
        if (this.ExamenForm) {
            this.ExamenForm.reset();
        }
        this.examen = examen;
        this.ExamenForm.patchValue({
            Id: this.examen.Id,
            Name: this.examen.Name,
            IsDeleted: this.examen.IsDeleted,
            SupervisorId: this.examen.SupervisorId,
            StartDate: new Date(this.examen.StartDate),
            EndDate: new Date(this.examen.EndDate),
            TermId: this.examen.TermId,
            CourseId: this.examen.CourseId,
            Coefficient: this.examen.Coefficient
        });
        console.log(this.ExamenForm.value)
    }


    Discard() {
        Swal.fire({
            html: `would you like to cancel?`,
            icon: "question",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Ok, got it!",
            cancelButtonText: 'Nope, cancel it',
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: 'btn btn-light'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.modalCloseBtn.nativeElement.click();
            } else if (result.dismiss) {
                Swal.fire({
                    text: "Your form has not been cancelled!.",
                    icon: "info",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        })
    }
}