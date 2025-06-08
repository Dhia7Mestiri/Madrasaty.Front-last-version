import { Component, ElementRef,
         OnDestroy,
         OnInit, ViewChild     } from '@angular/core';
import { ActivatedRoute        } from '@angular/router';
import { Subscription          } from 'rxjs';

import { MembersListService    } from '@services/members/members-list.service';
import { NotificationService   } from '@services/notification/notification.service';
import { ExamensService        } from '@services/Examens/examens.service';

import { Examen                } from '@models/examen';
import { ExamenNote            } from '@models/examen-note';


@Component({
    selector   : 'app-note-examen',
    templateUrl: './note-examen.component.html',
    styleUrls  : ['./note-examen.component.scss']
})
export class NoteExamenComponent implements OnInit, OnDestroy
{
    private sub: Subscription;
    errorMessage = '';
    examenNotesList: ExamenNote[] = [];
    examen: Examen;
    id

    rateInput = 0;
    @ViewChild("note") note2: ElementRef;
    @ViewChild("input_error") input_error: ElementRef;
    constructor(private route: ActivatedRoute, private notification: NotificationService,
        private examenService: ExamensService, private memberService: MembersListService)
    { }
    ngOnInit()
    {
        this.sub = this.route.paramMap.subscribe(
            params => {
                this.id = params.get('Id');
                this.getExamen(this.id);
            });
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }

    getExamen(id: number)
    {
        console.log(id);
        this.examenService.getExamenById(id)
            .subscribe({
                next: examen => {
                    this.examen = examen;
                    this.getExamenNotes(examen);
                },
                error: err => this.errorMessage = err
            });
    }

    getStudentPhoto(StudenPhoto)
    {
        return this.memberService.GetMemberPhotoPath(StudenPhoto);
    }

    getExamenNotes(examen: Examen)
    {
        this.examenService.getNotesExamen(1,examen.Id)
            .subscribe({
                next: examensList => {
                    this.examenNotesList = examensList;
                },
                error: err => this.errorMessage = err
            });
    }

    setNote(note)
    {
        // var model = {
        //     ExamenId: note.ExamenId,
        //     StudentId: note.StudentId.toString(),
        //     Note: note.Note,
        //     Observation: note.Observation
        // };

        this.examenService.updateNoteExamen(note)
            .subscribe({
                next: () => { this.notification.showSuccess("Examan note ajouté avec Success "), this.getExamen(note.ExamenId) },
                error: err => this.errorMessage = err
            });
    }

    enforceMinMax()
    {
        console.log(this.input_error.nativeElement.innerHTML);
        var el = this.note2.nativeElement;
        if (el.value != "")
        {
            if (parseInt(el.value) < parseInt(el.min)) {
                el.value = el.min;
            }

            if (parseInt(el.value) > parseInt(el.max)) {
                el.value = el.max;
            }
        }
    }

    clonedProducts: { [s: string]: any; } = {};
    onRowEditInit(product: any) {
        this.clonedProducts[product.id] = { ...product };
    }

    onRowEditCancel(product: any, index: number)
    {
        this.examenNotesList[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
    }
}