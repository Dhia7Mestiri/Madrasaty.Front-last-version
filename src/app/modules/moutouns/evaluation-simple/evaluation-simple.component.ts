import { NotificationService     } from '@services/notification/notification.service';
import { DatePipe                } from '@angular/common';
import { ChangeDetectionStrategy,
         Component, OnInit       } from '@angular/core';
import { FormGroup               } from '@angular/forms';
import { ActivatedRoute          } from '@angular/router';

import { EvaluationSimpleService       } from '@services/evaluation-simple/evaluation-simple.service';
import { MembersListService            } from '@services/members/members-list.service';
import { SessionService                } from '@services/session/session.service';
import { StudentDisciplineLevelService } from '@services/student-discipline-level/student-discipline-level.service';
import { UtilitiesService              } from '@services/Utilities/utilities.service';

import { Discipline      } from '@models/discipline';
import { DisciplineLevel } from '@models/DisciplineLevel';
import { Member          } from '@models/member';
import { MoutounDetail   } from '@models/moutoun-detaill';

import pdfMake  from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.fonts = {
    Src_Code: { normal: 'https://cdn.jsdelivr.net/npm/source-code-pro@2.30.2/TTF/SourceCodePro-Regular.ttf' },
    Vazir: { normal: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v27.2.2/dist/Vazir-Regular.ttf' },
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
}

@Component({
    selector       : 'app-evaluation-simple',
    templateUrl    : './evaluation-simple.component.html',
    styleUrls      : ['./evaluation-simple.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvaluationSimpleComponent implements OnInit
{
    mark: string;
    percent: number;
    max = 5;
    rate: any;
    PhotoPath: any;
    currentSessionId: number;
    currentStudentId: number;
    Debut;
    Fin;
    Poeme;
    Remarques;
    Rating;
    poemeList: any[];
    FullName: string;
    Discipline: Discipline;
    StudentHistory
    FiltredStudentHistorique = []
    Level: DisciplineLevel;
    currentRecitationDetail: MoutounDetail;
    DialogTitle: string;
    rowdata
    lastRecitaion
    SelectedPoeme
    ReciationId: number;
    evaluationSimpleForm: FormGroup;
    pagenumber = 1;
    selecteditem
    Document
    DocumentType
    PopHeader
    fileURL: string;
    displayMaximizable: boolean;

    constructor(private memberService: MembersListService, private route: ActivatedRoute,
        private studentDisciplineLevelService: StudentDisciplineLevelService, private utilitiesService: UtilitiesService,
        private recitationSessionService: SessionService, private evaluationSimpleService: EvaluationSimpleService,
        private datePipe: DatePipe, private notification: NotificationService)
    { }

    ngOnInit()
    {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        this.evaluationSimpleForm = this.evaluationSimpleService.createMoutounEvaluationSimpleForm();

        this.getParamsFromURL();
        this.evaluationSimpleService.getAllMoutounPoemes().subscribe(poeme => { this.poemeList = poeme });

        this.recitationSessionService.getSession(this.currentSessionId).subscribe({
            next: (data: any) => {
                this.ReciationId = data['ReciationId']
                this.getStudentDisciplineLevel(this.currentStudentId, data.DisciplineId);
            }
        })

        this.GetStudentHistorique(this.currentStudentId, this.currentSessionId);

        this.memberService.getStudent(this.currentStudentId)
            .subscribe({
                next: (member: Member) => {
                    this.PhotoPath = this.memberService.GetMemberPhotoPath(member[0].PhotoPath),
                        this.FullName = member[0].FullName

                },
                error: err => console.log(err)
            });
    }

    initRecitation()
    {
        let recitationDetailModel: MoutounDetail = {
            Id: 0,
            RecitationId: this.currentSessionId,
            RecitationSession: null,
            StudentId: this.currentStudentId,
            Student: null,
            Poeme: 1,
            VerseDebut: 1,
            VerseFin: 1,
            Rating: 0,
            Remarques: 'Ecrivez votre remarque',
            DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),
        };

        this.displayRecitationDetail(recitationDetailModel);
    }

    displayRecitationDetail(recitationDetail: MoutounDetail)
    {
        if (this.evaluationSimpleForm) {
            this.evaluationSimpleForm.reset();
        }
        this.currentRecitationDetail = recitationDetail;
        this.evaluationSimpleForm.patchValue({
            Poeme: this.currentRecitationDetail.Poeme,
            Debut: this.currentRecitationDetail.VerseDebut,
            Fin: this.currentRecitationDetail.VerseFin,
            Remarques: this.currentRecitationDetail.Remarques,
            Rating: this.currentRecitationDetail.Rating
        });
        this.Document = this.poemeList.find(x => x.Id == this.currentRecitationDetail.Poeme)
        this.DocumentType = this.utilitiesService.GetDocExtensionAndSetTheIcon(this.Document?.DocumentPath)
    }

    get poeme()
    {
        return this.evaluationSimpleForm.get('Poeme');
    }

    get debut()
    {
        return this.evaluationSimpleForm.get('Debut');
    }

    get fin()
    {
        return this.evaluationSimpleForm.get('Fin');
    }

    get remarques()
    {
        return this.evaluationSimpleForm.get('Remarques');
    }

    get rating()
    {
        return this.evaluationSimpleForm.get('Rating');
    }

    OpenDiag(id: number)
    {
        this.DialogTitle = "Modifier Moutoun"
        this.evaluationSimpleService.GetMoutounById(id)
            .subscribe({
                next: (moutounDetail: MoutounDetail) => this.displayRecitationDetail(moutounDetail),
                error: err => console.log(err)
            });
    }

    onSelectChange(arg: any)
    {
        this.SelectedPoeme = arg.value;
        if (this.SelectedPoeme != null && this.SelectedPoeme != "") {
            this.StudentHistory = this.rowdata.filter(x => x.Poeme === arg.value)
        }
        else { this.StudentHistory = this.rowdata; }
    }

    saveUpdates()
    {
        if (!this.evaluationSimpleForm.valid)
        {
            this.notification.showError("Please correct the validation errors.");
            return;
        }

        this.currentRecitationDetail.VerseDebut = this.evaluationSimpleForm.get('Debut').value;
        this.currentRecitationDetail.VerseFin = this.evaluationSimpleForm.get('Fin').value;
        const data = { ... this.currentRecitationDetail, ...this.evaluationSimpleForm.value };
        if (data.Id !== 0 || data.Id !== '' || data.Id !== null) {
            this.evaluationSimpleService.updateMoutounDetail(data)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre Moutoun Detail a été bien modifié"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId) },
                    error: err => err
                });
        }
    }

    getStudentDisciplineLevel(studentId: number, discplineId: number)
    {
        this.studentDisciplineLevelService.getStudentDisciplineLevel(studentId, discplineId).subscribe((data) => {
            this.Discipline = data['Wording'];
            this.Level      = data["studentlevel"];
        })
    }

    GetStudentHistorique(studentId, currentSessionId)
    {
        this.evaluationSimpleService.GetStudentHistorique(studentId, currentSessionId).subscribe(data => {
            this.rowdata = data,
                this.StudentHistory = data
            this.lastRecitaion = data[0]

            if (data.length == 0) {
                this.initRecitation();
            } else {
                this.displayRecitationDetail(this.lastRecitaion);
            }
        });
    }

    confirmSelection()
    {
        this.currentRecitationDetail.Rating = this.rating.value;
        this.currentRecitationDetail.Poeme = this.selecteditem;
        this.currentRecitationDetail.Remarques = this.remarques.value;
        this.currentRecitationDetail.VerseDebut = this.debut.value;
        this.currentRecitationDetail.VerseFin = this.fin.value;
        this.currentRecitationDetail.DateEvaluation = new Date();

        this.evaluationSimpleService.createMoutounDetail(this.currentRecitationDetail).subscribe(
        {
            next: () => { this.notification.showSuccess("Votre Moutoun Detail a été bien ajouté"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId) },
            error: () => this.notification.showError("Error"),
            complete: () => this.displayRecitationDetail(this.currentRecitationDetail)
        });
    }

    getselectedPoeme(event)
    {
        this.selecteditem = event.value;

        if (this.selecteditem != null) {
            this.Document     = this.poemeList.find(x => x.Id == this.selecteditem);
            this.DocumentType = this.utilitiesService.GetDocExtensionAndSetTheIcon(this.Document.DocumentPath);
        }
    }

    getVal(code)
    {
        return this.poemeList.find(x => x.Id == code)?.Wording;
    }

    getParamsFromURL()
    {
        const param  = +this.route.snapshot.paramMap.get('SessionId');
        const param2 = +this.route.snapshot.paramMap.get('Id');
        this.currentSessionId = param;
        this.currentStudentId = param2;
    }

    async deleteItem(id: number)
    {
        if (await this.notification.deleteElementAlert())
        {
            this.evaluationSimpleService.deleteMoutounDetail(id)
                .subscribe({
                    next: () => { this.notification.showInfo("Votre Moutoun Detail a été bien supprimée"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId) },
                    error: err => console.log(err)
                });
        }
    }

    generatePDF(arg)
    {
        var action = arg.action;
        var poeme  = arg.Poeme;
        var order  = arg.OrderBy;

        this.evaluationSimpleService.GetFiltredStudentHistorique(this.currentStudentId, this.currentSessionId, poeme, order).subscribe(data => {
            this.FiltredStudentHistorique = data
            let docDefinition = {
                content: [
                    {
                        text: 'Historique De Moutoun',
                        fontSize: 16,
                        alignment: 'center',
                        color: '#047886'
                    },
                    { text: 'Student Information', style: 'sectionHeader' },
                    ,
                    {
                        text: "Name : " + this.FullName,
                        fontSize: 13,
                    },
                    {
                        text: "Discipline  : " + this.Discipline,
                        fontSize: 13,
                    },
                    {
                        text: "Niveau  : " + this.Level,
                        fontSize: 13,
                        margin: [0, 0, 0, 15]
                    },
                    {
                        style: ['english', 'arab'],
                        table: {
                            headerRows: 1,
                            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                            body: [
                                ['Poeme', 'VerseDebut', 'VerseFin', 'Rating', 'Remarques'],
                                ...this.FiltredStudentHistorique.map(p => ([this.getVal(p.Poeme), p.VerseDebut, p.VerseFin, p.Rating, p.Remarques]))

                            ],
                        }
                    }
                ],
                styles: {
                    arab: {
                        font: 'Vazir',
                    },
                    english: {
                        font: 'Src_Code'
                    },
                    sectionHeader: {
                        bold: true,
                        decoration: 'underline',
                        fontSize: 14,
                        margin: [0, 15, 0, 12]
                    }
                }
            }

            if (action === 'download') {
                pdfMake.createPdf(docDefinition).download(this.FullName);
            } else if (action === 'open') {
                pdfMake.createPdf(docDefinition).open();
            } else {
                pdfMake.createPdf(docDefinition).print();
            }
        });
    }

    openDocment(document, name)
    {
        if (document != null) {
            this.displayMaximizable = true;
            this.fileURL = this.evaluationSimpleService.GetMoutounPoemeDocPath(document)
            this.PopHeader = name
        }
        else {
            this.notification.showInfo("Aucun fichier à ouvrir");
        }
    }
}