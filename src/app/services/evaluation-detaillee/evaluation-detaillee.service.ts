import { Injectable      } from '@angular/core';
import { HttpClient      } from '@angular/common/http';
import { FormBuilder,
         FormGroup,
         Validators      } from '@angular/forms';
import { Observable,
         BehaviorSubject } from 'rxjs';

import { Surah           } from '@models/surah';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';
import { TajwidErrorResponse } from '@interfaces/TajwidErrorResponse';

@Injectable({
    providedIn: 'root'
})
export class EvaluationDetailleeService
{
    recitationDetail = new BehaviorSubject<any>(0);
    item = new BehaviorSubject<any>(0);
    SearchForm: FormGroup;
    TasmiiHistoriqueEvaluationForm: FormGroup;
    TasmiiEvaluationForm: FormGroup;
    httpOptions: any;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createSearchForm()
    {
        this.SearchForm = this.formBuilder.group({
            RecitationId: [0],
            TeacherId: ["00000000-0000-0000-0000-000000000000"],
            StudentId: ["00000000-0000-0000-0000-000000000000"],
            evaluationDate: [""],
            PageNumber: [1],
        });

        return this.SearchForm;
    }
    createTasmiiHistoriqueEvaluationForm()
    {
        this.TasmiiHistoriqueEvaluationForm = this.formBuilder.group({
            Id: [],
            Surah: [''],
            VerseDebut: [],
            VerseFin: [],
            Remarques: [''],
            Rating: [0],
            StudentId: [],
            TeacherId: [],
            RecitationId: [],
            DateEvaluation: []
        });

        return this.TasmiiHistoriqueEvaluationForm;
    }

    createTasmiiEvaluationForm()
    {
        this.TasmiiEvaluationForm = this.formBuilder.group({
            Surah: [1, Validators.required],
            AyahDebut: [1, Validators.min(1)],
            AyahFin: [1, [Validators.min(1), Validators.max(286)]],
            Remarques: [''],
            Rating: [0, Validators.required],
            changebuttonPerClick: [false]
        });

        return this.TasmiiEvaluationForm;
    }

    /*   public getSurahs() {
        return this.http.get("../../assets/files/surahs.json");.map((data) => data["data"]).map((da) => da.numberOfAyahs).map((data) => data["data"])
      } */
    getSurah(): Observable<Surah[]>
    {

        //return this.http.get<Surah[]>(consts.QURAN_URL)
        return this.http.get<Surah[]>(consts.FRONT_URL + "assets/files/surahs.json");
    }

    getSurahById(number: number): Observable<number>
    {
        return this.http.get<number>(consts.QURAN_URL + "/" + number);
    }
    /*   getLibelleSurahById(number: number): Observable<string> {
    
        return this.http.get<string>(consts.QURAN_URL + "/" + number).map((data) => data["data"]).map((da) => da.name+" "+da.englishName)
      } */

    createRecitationTajwidErrors(recitationTajwidErrors)
    {
        return this.http.post(consts.RECITATION_TAJWIDERROR_URL, recitationTajwidErrors, { withCredentials: true, headers: this.httpOptions });
    }

    createLearningError(learningError)
    {
        return this.http.post(consts.LearningError_URL, learningError, { withCredentials: true, headers: this.httpOptions });
    }

    getRecitationTajwidErrors(recitationDetailId: number)
    {
        return this.http.get(consts.RECITATION_TAJWIDERROR_URL + "RecitationDetail/" + recitationDetailId, { withCredentials: true, headers: this.httpOptions });
    }

    DeleteRecitationTajwidErrors(recitationDetailId: number)
    {
        return this.http.delete<any>(consts.RECITATION_DETAIL_URL + recitationDetailId, { withCredentials: true, headers: this.httpOptions });
    }

    getAllRecitationTajwidErrors()
    {
        return this.http.get(consts.RECITATION_TAJWIDERROR_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getAllLearningErrorByRecitationIdAndStudentId(RecitationId, StudentId)
    {
        return this.http.get(consts.LearningError_URL + "RecitationDetail/" + RecitationId + "/" + StudentId, { withCredentials: true, headers: this.httpOptions });
    }

    getAllTajweedErrorByRecitationIdAndStudentId(RecitationId, StudentId) : Observable<TajwidErrorResponse>
    {
        return this.http.get<TajwidErrorResponse>(consts.RECITATION_TAJWIDERROR_URL + "RecitationDetail/" + RecitationId + "/" + StudentId, { withCredentials: true, headers: this.httpOptions });
    }

    GetFiltredTsmiiStudentHistorique(studentId, recitationId, Poeme, OrderBy)
    {
        return this.http.get<any[]>(consts.RECITATION_DETAIL_URL + "FiltredStudentHistorique/" + studentId + "/" + recitationId + "?Poeme=" + Poeme + "&OrderBy=" + OrderBy, { withCredentials: true, headers: this.httpOptions });
    }

    deleteLearningError(learningError, recitationDetail)
    {
        return this.http.delete(consts.LearningError_URL + "?id=" + learningError.id.toString() + "&recitationDetailId=" + recitationDetail, { withCredentials: true, headers: this.httpOptions });
    }

    UpdateLearningError(id, learningError): Observable<any>
    {
        return this.http.put<any>(consts.LearningError_URL + id, learningError, { withCredentials: true, headers: this.httpOptions });
    }
    updateTasmiiDetail(TasmiiDetail): Observable<any>
    {
        return this.http.put<any>(consts.RECITATION_DETAIL_URL + "/" + TasmiiDetail.Id, TasmiiDetail, { withCredentials: true, headers: this.httpOptions });
    }

    changeRecitationDetail(recitationDetailId)
    {
        this.recitationDetail.next(recitationDetailId);
    }

    changeItem(item)
    {
        this.item.next(item);
    }

    getExistingLearningErrors(recitationDetailId: number): Observable<any>
    {
        if (recitationDetailId == undefined)
        {
            return;
        }

        return this.http.get(consts.LearningError_URL + "RecitationDetail/" + recitationDetailId, { withCredentials: true, headers: this.httpOptions });
    }

    GetStudentHistory(studentId, currentSessionId): Observable<any>
    {
        return this.http.get(consts.STUDENT_RECITATION_DETAIL_URL + studentId + "/" + currentSessionId, { withCredentials: true, headers: this.httpOptions });
    }

    SearchTasmii(pageNumber, studentId, teacherId, evaluationDate, recitationId): Observable<any[]>
    {
        return this.http.get<any[]>(consts.RECITATION_DETAIL_URL + "Search" + "?pageNumber=" + pageNumber + "&studentId=" + studentId + "&teacherId=" + teacherId + "&evaluationDate=" + evaluationDate + "&recitationId=" + recitationId, { withCredentials: true, headers: this.httpOptions });
    }

    getTasmiiecitaionsSessions(): Observable<any[]>
    {
        return this.http.get<any[]>(consts.RECITATION_DETAIL_URL + "/TasmiiRecitations", { withCredentials: true, headers: this.httpOptions });
    }

    getTasmiiEvaluationDates(): Observable<any[]>
    {
        return this.http.get<any[]>(consts.RECITATION_DETAIL_URL + "/TasmiiEvaluationDates", { withCredentials: true, headers: this.httpOptions });
    }
}