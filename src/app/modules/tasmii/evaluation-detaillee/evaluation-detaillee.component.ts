import { ChangeDetectionStrategy,
         ChangeDetectorRef,
         Component, OnInit             } from '@angular/core';
import { DatePipe                      } from '@angular/common';
import { FormGroup                     } from '@angular/forms';
import { ActivatedRoute                } from '@angular/router';

import { Discipline                    } from '@models/discipline';
import { DisciplineLevel               } from '@models/DisciplineLevel';
import { Member                        } from '@models/member';
import { RecitationDetail              } from '@models/recitation-detail';
import { EvaluationDetailleeService    } from '@services/evaluation-detaillee/evaluation-detaillee.service';
import { MembersListService            } from '@services/members/members-list.service';
import { NotificationService           } from '@services/notification/notification.service';
import { RecitationDetailService       } from '@services/recitation-detail/recitation-detail.service';
import { SessionService                } from '@services/session/session.service';
import { StudentDisciplineLevelService } from '@services/student-discipline-level/student-discipline-level.service';
import { TajwidErrorService            } from '@services/tajwid-error/tajwid-error.service';
import { UtilitiesService              } from '@services/Utilities/utilities.service';

import pdfMake from "pdfmake/build/pdfmake";

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
    selector       : 'app-evaluation-detaillee',
    templateUrl    : './evaluation-detaillee.component.html',
    styleUrls      : ['./evaluation-detaillee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluationDetailleeComponent implements OnInit
{
    PhotoPath: any;
    profile: Member;
    fautes = [];
    FiltredStudentHistorique = []
    LearningErrorcount = 0;
    TajwidErrorcount = 0
    surahForm: FormGroup;
    currentSurah: any;
    surahList = []  
    max = 5;
    
    overStar: number | undefined;
    mark: string;
    percent: number;
    currentSessionId: number;
    currentStudentId: number;
    FullName: string;
    Discipline: Discipline;
    Level: DisciplineLevel;
    currentRecitationDetail: RecitationDetail;  
    tajwidErrorData;
    SelectedSurah
    StudentHistory
    StudentsLearningErrors = []
    rowdata
    StudentsTajwidErrors
    lastReciatation    
    RecitationId
    AllLearningErrorsByRecitationIdAndStudentId
    AllTajwidErrorsByRecitationIdAndStudentId
    memberStatusData
    numberOfRecitatedsurah
    EvaluatedMemberCity
    EvaluatedMemberEmail  
    p: number = 1
    buttonPerClick = 10
    numberofayah
    showFautesTajwidHistory: boolean = false
    DialogTitle
    finalError=[]
    endOperation
    subErrorsList
    modalTitle
    item
    display: boolean = false;
    hideCongras: boolean = true;
    value:Number=0
    surahHistoriqueByStudent=[]
    LastHistoriqueBysurah
    minAyah=1
    maxAyah=100
    Surah
    Numnberofayahs
    CompletedRecitationSurah: boolean = true;

    constructor(private memberService: MembersListService, private notification: NotificationService, private recitationDetailService: RecitationDetailService,
        private recitationSessionService: SessionService, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
        private tajwidErrorService: TajwidErrorService,private utilitiesService: UtilitiesService, 
        private studentDisciplineLevelService: StudentDisciplineLevelService,
        private evaluationDetailleService: EvaluationDetailleeService, private datePipe: DatePipe) {
    }

    ngOnInit()
    {
        this.surahForm = this.evaluationDetailleService.createTasmiiEvaluationForm()
        this.evaluationDetailleService.getSurah().subscribe((data) => {this.surahList = data  })
        this.getParamsFromURL();
        this.recitationSessionService.getSession(this.currentSessionId).subscribe((data) => {
            this.studentDisciplineLevelService.getStudentDisciplineLevel(this.currentStudentId, data.DisciplineId).subscribe((data) => {
                this.Discipline = data['Wording'], this.Level = data["studentlevel"]
            })
        })
        this.memberService.getStudent(this.currentStudentId).subscribe({
  next: (member: any) => { // Remove the array access
    console.log('Member data:', member);
    this.PhotoPath = this.memberService.GetMemberPhotoPath(member.Photo); // Changed from PhotoPath to Photo
    this.FullName = member.FullName;
    this.EvaluatedMemberCity = member.City; 
    this.EvaluatedMemberEmail = member.Email;
    
    if (member.MemberStatusId) { // Ensure this field exists in your response
      this.memberService.getMemberStatusById(member.MemberStatusId)
        .subscribe(statusData => {
          this.memberStatusData = statusData?.Wording;
        });
    }
  },
  error: (err) => console.error(err)
});

        this.GetStudentHistorique(this.currentStudentId, this.currentSessionId)
        this.tajwidErrorService.getTajwidErrors().subscribe(TajwidErrorData => { this.tajwidErrorData = TajwidErrorData });
        this.detectSouratChanges();  
    }

    ngAfterViewInit()
    {
        this.evaluationDetailleService.getAllLearningErrorByRecitationIdAndStudentId(this.currentSessionId, this.currentStudentId).subscribe((data) => {
            this.AllLearningErrorsByRecitationIdAndStudentId = data
            this.AllLearningErrorsByRecitationIdAndStudentId.map((item) => {
                this.LearningErrorcount = this.LearningErrorcount + item.Wording.split(',').length
            })
        })
        this.evaluationDetailleService.getAllTajweedErrorByRecitationIdAndStudentId(this.currentSessionId, this.currentStudentId).subscribe((data) => {
    this.TajwidErrorcount = data.count;
    this.AllTajwidErrorsByRecitationIdAndStudentId = data.errors;
});

    }

    ngAfterContentChecked()
    {
        this.changeDetector.detectChanges();
    }


    getParamsFromURL()
    {
        const param = this.route.snapshot.paramMap.get('SessionId');
        const param2 = this.route.snapshot.paramMap.get('Id');
        this.currentSessionId = +param;
        this.currentStudentId = +param2;
    }

    detectSouratChanges()
    { 
        this.surahForm.valueChanges.subscribe(val => {   
          
            this.fautes = [],
                [...Array.from({ length: this.buttonPerClick>this.Numnberofayahs?this.Numnberofayahs:this.buttonPerClick }, (v, k) => k + this.ayahDebut.value)].forEach(element => {
                    let faute = { id: element, cssclass: "btn btn-light-primary", clicked: false}
                    this.fautes.push(faute);
                });    
            if (!this.currentRecitationDetail?.Id){ return; }
            this.evaluationDetailleService.getExistingLearningErrors(this.currentRecitationDetail?.Id).subscribe((data) => {
                if (!data[0]?.Wording) { return; }
                var array = data[0].Wording.split(",").map(Number)
                this.fautes.forEach(element => {
                    var exists = array.includes(element.id) && this.currentRecitationDetail?.Id == data[0].RecitationDetailId
                    if (exists) { element.cssclass = "btn btn-success", element.clicked = true }
                });
            })
        })
    }

    Next()
    { 
        this.surahForm.patchValue({
            Surah:    this.Surah.number,
            AyahDebut:     this.StudentHistory[0].VerseFin+1<= this.Numnberofayahs?   this.StudentHistory[0].VerseFin+1: this.Numnberofayahs,
            AyahFin:  this.Numnberofayahs,
            Rating: 1,
            Remarques: 'Ecrivez votre remarque',
            DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),
        }); 
        this.maxAyah=  this.Numnberofayahs
        this.minAyah=this.surahForm.get("AyahDebut").value
        if( this.CompletedRecitationSurah){         
            this.surahForm.patchValue({ Surah:    this.Surah.number+1})
          this.refreshAyahs()
         
        }

    }

    

    initRecitation()
    {
        let recitationDetailModel: RecitationDetail = {
            Id: 0,
            SeanceId: this.currentSessionId,
            RecitationSession: null,
            StudentId: this.currentStudentId,
            Student: null,
            Surah: 1,
            VerseDebut: 1,
            VerseFin: 1,
            Rating: 1,
            Remarques: 'Ecrivez votre remarque',
            DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),
        };
        this.displayRecitationDetail(recitationDetailModel)
        this.buttonPerClick = 10
        this.changebuttonPerClick.setValue(true)
    }

    displayRecitationDetail(recitationDetail: RecitationDetail)
    {
        if (this.surahForm) {
            this.surahForm.reset();
        }

        this.currentRecitationDetail = recitationDetail;
        this.surahForm.patchValue({
            Surah: this.currentRecitationDetail.Surah,
            AyahDebut: this.currentRecitationDetail.VerseDebut,
            AyahFin: this.currentRecitationDetail.VerseFin,
            Remarques: this.currentRecitationDetail.Remarques,
            Rating: this.currentRecitationDetail.Rating
        });
    }

    refreshAyahs()
    {     
        if (this.surah.value != "" && this.surah.value != 0) { 
            var surahById= this.surahList.find(opt => opt.number == this.surah.value);          
            var selectedSurah=this.surah.value;  
            this.Numnberofayahs = surahById.numberOfAyahs

            this.evaluationDetailleService.GetFiltredTsmiiStudentHistorique(this.currentStudentId, this.currentSessionId, selectedSurah,"Date d'Evaluation").subscribe(data => {
                 this.LastHistoriqueBysurah=data[0]
                this.surahHistoriqueByStudent=data   
                if( this.surahHistoriqueByStudent.length!=0){
                    this.CompletedRecitationSurah=false;
                    var maxRecitatedAyah = Math.max(...this.surahHistoriqueByStudent.map(o => o.VerseFin))
                    var minRecitatedAyah = Math.min(...this.surahHistoriqueByStudent.map(o => o.VerseDebut))             
                   
                    this.value= Number((((maxRecitatedAyah-minRecitatedAyah+1)/  this.Numnberofayahs) * 100).toPrecision(2));
                    if(this.value==100){
                        this.CompletedRecitationSurah=true;
                        this.notification.showInfo( this.FullName +" has Successfully Completed this Surah ✅ ")                  

                 
                    let timer = setInterval(() => { this.hideCongras = false }, 2000);
                            setTimeout(() => { clearInterval(timer); this.hideCongras = true }, 5999);            
            

                    }
                }else{
                    this.value= 0
                }             
             if(this.LastHistoriqueBysurah!=null){              
                this.surahForm.patchValue({
                    AyahDebut: data[0].VerseFin+1<=  this.Numnberofayahs?data[0].VerseFin+1:  this.Numnberofayahs,
                    AyahFin:   this.Numnberofayahs
                });        
             }else{              
                this.surahForm.patchValue({
                    AyahDebut: 1,
                    AyahFin:   this.Numnberofayahs
                });             
             }
             this.maxAyah=   this.Numnberofayahs
             this.minAyah=this.surahForm.get("AyahDebut").value           
            })           
         }      
    }  

    get surah()
    {
        return this.surahForm.get('Surah');
    }
    get ayahDebut()
    {
        return this.surahForm.get('AyahDebut');
    }
    get ayahFin()
    {
        return this.surahForm.get('AyahFin');
    }
    get rating()
    {
        return this.surahForm.get('Rating');
    }
    get changebuttonPerClick()
    {
        return this.surahForm.get('changebuttonPerClick');
    }

    get Remarques()
    {
        return this.surahForm.get('Remarques');
    }

    pushItem($event)
    {
        if (this.buttonPerClick < this.ayahFin.value)
        {
            console.log(this.buttonPerClick)
            this.buttonPerClick = this.buttonPerClick + 9;
            if (this.buttonPerClick > this.ayahFin.value) {
                this.buttonPerClick = this.ayahFin.value + 1 - this.ayahDebut.value
            }
            this.changebuttonPerClick.setValue(true)
        }
    }

    removeItem($event)
    {
        if (this.numberofayah < 10)
        {
            this.buttonPerClick = this.numberofayah;
        }
        else if (this.buttonPerClick > this.ayahDebut.value)
        {
            this.buttonPerClick = this.buttonPerClick - 9;
            if (this.buttonPerClick <= this.ayahDebut.value) {
                this.buttonPerClick = 10
            }
            this.changebuttonPerClick.setValue(true)
        }
    }

    generatePDF(arg)
    {
        var action = arg.action
        var poeme = arg.Poeme
        var order = arg.OrderBy
        console.log(order)
        this.evaluationDetailleService.GetFiltredTsmiiStudentHistorique(this.currentStudentId, this.currentSessionId, poeme, order).subscribe(data => {
            this.FiltredStudentHistorique = data
            console.log(data)
            this.FiltredStudentHistorique.map(item =>
            {
                item.Surah = this.getVal(item.Surah)
                this.evaluationDetailleService.getExistingLearningErrors(item.Id).subscribe({
                    next: response => {
                        if (response.length == 0)
                            response.push({ Wording: "" });
                        item.tajweedList = data[0].Errors
                    },

                    error: err => console.log(err),
                    complete: () =>
                    {
                        var docDefinition = {
                            content: [
                                {
                                    text: 'Historique De Tasmii',
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
                                { text: '', style: 'header' },

                                this.utilitiesService.table(this.FiltredStudentHistorique, ['Surah', 'VerseDebut', 'VerseFin', 'Rating', 'Remarques', 'tajweedList'], ['english', 'arab']),
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
                            pdfMake.createPdf(docDefinition).download();
                        } else if (action === 'open') {
                            pdfMake.createPdf(docDefinition).open();
                        } else {
                            pdfMake.createPdf(docDefinition).print();
                        }
                    }
                });
            })
        });
    }

    
    OpenDiag(id: number)
    {
        this.DialogTitle = "Modifier Tasmii"
        console.log(id)
        this.recitationDetailService.getRecitationDetail(id)
            .subscribe({
                next: (moutounDetail: any) => { console.log(moutounDetail), this.displayRecitationDetail(moutounDetail) },
                error: err => console.log(err)
            });
    }


    ConfirmItems($event)
    {
        let learningErrorList: Array<any> = [];
        this.fautes.filter(x => x.clicked == true).forEach(element => {
            learningErrorList.push(element.id)
        });
        let learningError = {
            Id: 0,
            RecitationDetailId: this.currentRecitationDetail.Id,
            Wording: learningErrorList.toString()
        }
        this.evaluationDetailleService.getExistingLearningErrors(this.currentRecitationDetail.Id).subscribe((data) =>
        { 
            if (!data[0])
            {
                this.evaluationDetailleService.createLearningError(learningError).subscribe(
                    {
                        next: () => this.notification.showSuccess("votre Fautes d'apprentisage ont été bien ajoutés"),
                        error: () =>  this.notification.showSuccess("Un problème est survenu lors de la mise à jour de l'évaluation")
                    });
            }
            else
            {
                learningError.Id = data[0].Id
                this.evaluationDetailleService.UpdateLearningError(data[0].Id, learningError).subscribe(
                    {
                        next: () => this.notification.showSuccess("votre Fautes d'apprentisage ont été bien ajoutés"),
                        error: () =>   this.notification.showSuccess("Un problème est survenu lors de la mise à jour de l'évaluation")
                    });
             }
        });
    }

    ShowFautesHistoryByRecitationId(RecitationId)
    {
        this.showFautesTajwidHistory = true
        this.RecitationId = this.currentRecitationDetail.Id
        this.refreshFautesTajwidHistory(RecitationId)
        this.refreshLearningErrorHistory(RecitationId)
    }

    refreshFautesTajwidHistory(RecitationId)
    {
        this.evaluationDetailleService.getRecitationTajwidErrors(RecitationId).subscribe((data) => {
            this.StudentsTajwidErrors = data
        });
    }

    refreshLearningErrorHistory(RecitationId)
    {
        this.evaluationDetailleService.getExistingLearningErrors(RecitationId).subscribe((data) => {
            this.StudentsLearningErrors = data
        });
       // return this.StudentsLearningErrors[0]?.Wording
    }

    getErrorLearningList(codes)
    {
        var array: [] = codes.split(",")
        let tajwiderrorlist: Array<any> = [];
        array.forEach(item => {
            tajwiderrorlist.push(item)
        })
        return tajwiderrorlist
    }

    getErrorName(codes, errorCategory)
    {
        var array: [] = codes.split(",")
        let tajwiderrorName: Array<any> = [];
        array.forEach(item => {
            var code = this.getchildName(errorCategory, item)
            tajwiderrorName.push(code)
        })
        return tajwiderrorName
    }

    getErrorList(codes, errorCategory)
    {
        var array: [] = codes.split(",")
        let tajwiderrorName: Array<any> = [];
        array.forEach(item => {
            var code = this.getchildName(errorCategory, item)
            tajwiderrorName.push(code)
        })
        return tajwiderrorName
    }

    CloseFautesTajwidHistoryByRecitationId()
    {
        this.showFautesTajwidHistory = false
    }


    onButtonClick(btnClicked)
    {
        let itemToEdit = this.fautes.find(item => item.id == btnClicked.id);

        if (itemToEdit.Wording != "-Infinity") {
            if (itemToEdit.clicked) {
                itemToEdit.cssclass = "btn btn-light-primary  btn-hover-rise"
                itemToEdit.clicked = !itemToEdit.clicked

            }
            else {
                itemToEdit.cssclass = "btn btn-success  btn-hover-rise"
                itemToEdit.clicked = !itemToEdit.clicked
            }

            this.fautes.map((item, i) => {
                if (item.id == itemToEdit.id) {
                    this.fautes[i] = itemToEdit;
                }
            });
        }
    }

    async deleteItem(id: number)
    {
        if (await this.notification.deleteElementAlert()) {
            this.evaluationDetailleService.DeleteRecitationTajwidErrors(id)
                .subscribe({
                    next: () => { this.notification.showInfo("Votre Recitation Tajwid Errors Detail a été bien supprimée"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId) },
                    error: err => console.log(err)
                });
        }
    }

    closeDialog()
    {
        this.display = false;
    }

    GetFinalError($event)
    {
        this.endOperation = $event.end
        this.finalError = $event.data
    }

    ClickButtonOfTajwidError(item)
    {
        this.item = item
        this.display = true;
        this.evaluationDetailleService.changeItem(item)
        this.evaluationDetailleService.changeRecitationDetail(this.currentRecitationDetail.Id)
        this.modalTitle = item.name;
        this.subErrorsList = item.children;
    }

    SaveTajwidErrors() {
    let tajwiderrorCodelist: Array<any> = [];
    this.finalError.forEach(element => {
        const code = this.getchildCode(this.item.name, element);
        tajwiderrorCodelist.push(code);
    });

    // ✅ Get the list of clicked ayahs (IDs)
    const selectedAyahs = this.fautes.filter(f => f.clicked).map(f => f.id);

    // ✳️ Default to Aya 0 if none selected
    const aya = selectedAyahs.length > 0 ? selectedAyahs[0] : 0;

    const tajwidError = {
        RecitationId: this.currentRecitationDetail.Id,
        Aya: aya,
        TajwidErrorId: this.item.name,
        TajwidErrorList: tajwiderrorCodelist.toString()
    };

    this.evaluationDetailleService.createRecitationTajwidErrors(tajwidError).subscribe({
        next: response => {
            this.notification.showSuccess("Votre faute de Tajwid a bien été ajoutée");
            this.refreshFautesTajwidHistory(this.RecitationId);
        },
        error: err => {
            this.notification.showError("Un problème est survenu lors de la mise à jour de l'évaluation");
        }
    });
}


    getchildCode(Categoryname, childName)
    {
        var target = this.tajwidErrorData.find(x => x.name == Categoryname);
        var Childcode = target.children.find(x => x.name == childName).code;
        return Childcode
    }

    getchildName(Categoryname, childCode)
    {
        var target = this.tajwidErrorData.find(x => x.name == Categoryname);
        var Childname = target.children.find(x => x.code == childCode).name;
        return Childname;
    }

    GetStudentHistorique(studentId, currentSessionId)
    {
        this.evaluationDetailleService.GetStudentHistory(studentId, currentSessionId).subscribe((data) =>
        {
            this.numberOfRecitatedsurah = new Set(data.map(item => item.Surah)).size;
            this.rowdata = data
            this.StudentHistory = data
            if (data[0] == null) {
                this.initRecitation();
            }
            else
            {
                this.displayRecitationDetail(data[0])
                this.Surah = this.surahList.find(opt => opt.number == data[0].Surah);
                this.Numnberofayahs = this.Surah.numberOfAyahs
                this.maxAyah = this.Numnberofayahs
                this.minAyah = this.surahForm.get("AyahDebut").value
                this.evaluationDetailleService.GetFiltredTsmiiStudentHistorique(this.currentStudentId, this.currentSessionId, this.Surah.number, "Date d'Evaluation").subscribe(data => {
                    this.LastHistoriqueBysurah = data[0]
                    this.surahHistoriqueByStudent = data
                    if (this.surahHistoriqueByStudent.length != 0)
                    {
                        this.CompletedRecitationSurah = false;
                        var maxRecitatedAyah = Math.max(...this.surahHistoriqueByStudent.map(o => o.VerseFin))
                        var minRecitatedAyah = Math.min(...this.surahHistoriqueByStudent.map(o => o.VerseDebut))
                        this.value = Number((((maxRecitatedAyah - minRecitatedAyah + 1) / this.Numnberofayahs) * 100).toPrecision(2));
                        if (this.value == 100) {
                            this.CompletedRecitationSurah = true;
                            this.notification.showInfo(this.FullName + "has successfully completed this Surah")
                            let timer = setInterval(() => { this.hideCongras = false }, 1000);
                            setTimeout(() => { clearInterval(timer); this.hideCongras = true }, 5999);
                        }
                    }
                    else
                    {
                        this.value = 0
                    }
                })
            }
        });
    }

    onSelectChange(arg: any)
    {
        this.SelectedSurah = arg.value;
        if (this.SelectedSurah != null && this.SelectedSurah != "") {
            this.StudentHistory = this.rowdata.filter(x => x.Surah === arg.value)
        }
        else {
            this.StudentHistory = this.rowdata;
        }
    }

    getVal(code)
    {
        var data = this.surahList.find(x => x.number == code)
        return data?.name + " | " + data?.englishName
    }

    confirmRecitationDetail()
    {
        this.currentRecitationDetail.SeanceId = this.currentSessionId;
        this.currentRecitationDetail.StudentId = this.currentStudentId;
        this.currentRecitationDetail.Rating = this.rating.value;
        this.currentRecitationDetail.Surah = this.surah.value;
        this.currentRecitationDetail.Remarques = this.Remarques.value;
        this.currentRecitationDetail.VerseDebut = this.ayahDebut.value;
        this.currentRecitationDetail.VerseFin = this.ayahFin.value;
        this.currentRecitationDetail.DateEvaluation = new Date();
        this.recitationDetailService.createRecitationDetail(this.currentRecitationDetail).subscribe(
        {
            next: (data) => {
                this.notification.showSuccess(" votre évaluation a été bien ajoutée"),
                this.GetStudentHistorique(this.currentStudentId, this.currentSessionId), this.displayRecitationDetail(data)
            },
            error: err => console.log("error")
        });
    }

    UpdateRecitationDetail()
    {
        this.currentRecitationDetail.Rating = this.rating.value;
        this.currentRecitationDetail.Surah = this.surah.value;
        this.currentRecitationDetail.Remarques = this.Remarques.value;
        this.currentRecitationDetail.VerseDebut = this.ayahDebut.value;
        this.currentRecitationDetail.VerseFin = this.ayahFin.value;

        const aux = { ... this.currentRecitationDetail };

        console.log(aux)
        if (aux.Id !== 0 || aux.Id !== null) {
            this.evaluationDetailleService.updateTasmiiDetail(aux)
                .subscribe({
                    next: () => { this.notification.showSuccess("Votre Moutoun Detail a été bien modifié"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId) },
                    error: err => err
                });
        }
        else {
            this.notification.showError("Please correct the validation errors.")
        }
    }

    /*           this.currentRecitationDetail.VerseDebut  = this.surahForm.get('VerseDebut').value;
              this.currentRecitationDetail.VerseFin  = this.surahForm.get('VerseFin').value;
           
     
                const aux = { ... this.currentRecitationDetail, ...this.surahForm.value };
                
            
                console.log(aux)
           if (aux.Id !== 0 || aux.Id !== '' || aux.Id !== null) {
                  this.evaluationDetailleService.updateTasmiiDetail(aux)
                    .subscribe({
                      next: () => {this.notification.showSuccess("Votre Moutoun Detail a été bien modifié") ,this.GetStudentHistorique(this.currentStudentId,this.currentSessionId)},
                      error: err => err
                    }); 
                }    
             else {
              this.notification.showError("Please correct the validation errors.")       
            } 
            
                UpdateRecitationDetail() {
            this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe(
                {
                    next: response => {this.notification.showSuccess("votre Recitation  a été bien ajouté"), this.GetStudentHistorique(this.currentStudentId, this.currentSessionId)},
                    error: err => console.log("error")
                });
        }
        */
}