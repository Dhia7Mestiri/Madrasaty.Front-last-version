import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,
         HttpParams              } from '@angular/common/http';
import { FormBuilder, FormGroup,
         Validators              } from '@angular/forms';
import { Observable, of,
         BehaviorSubject         } from 'rxjs';

import { MoutounDetail  } from '@models/moutoun-detaill';
import { MoutounPoeme   } from '@models/MoutounPoeme';
import { getAccessToken } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class EvaluationSimpleService
{
    recitationDetail = new BehaviorSubject<any>(0);
    item = new BehaviorSubject<any>(0);
    MoutounPoemeForm: FormGroup;
    moutounForm: FormGroup;
    searchForm: FormGroup;
    evaluationSimpleForm: FormGroup;
    private httpOptions: any;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createEvaluationMoutounHistoriqueForm()
    {
        this.moutounForm = this.formBuilder.group({
            Id: [],
            Poeme: [''],
            VerseDebut: [],
            VerseFin: [],
            Remarques: [''],
            Rating: [0],
            StudentId: [],
            TeacherId: [],
            RecitationId: [],
            DateEvaluation: []
        });

        return this.moutounForm;
    }

    createEvaluationMoutounForm()
    {
        this.moutounForm = this.formBuilder.group({
            Id: [],
            Poeme: [''],
            VerseDebut: [],
            VerseFin: [],
            Remarques: [''],
            Rating: [0],
            StudentId: [],
            TeacherId: [],
            RecitationId: [],
            evaluationDate: []
        });

        return this.moutounForm;
    }

    createMoutounEvaluationSimpleForm()
    {
        this.evaluationSimpleForm = this.formBuilder.group({
            Poeme: [""],
            Debut: [Validators.min(1)],
            Fin: [Validators.min(1)],
            Remarques: [''],
            Rating: [0, Validators.required]
        });

        return this.evaluationSimpleForm;
    }

    createMoutounPoemeForm()
    {
        this.MoutounPoemeForm = this.formBuilder.group({
            Id: [0],
            Title: [''],
            File: [],
            SchoolId: []
        });

        return this.MoutounPoemeForm;
    }

    createMoutounSearchForm()
    {
        this.searchForm = this.formBuilder.group({
            RecitationId: [0],
            TeacherId: ["00000000-0000-0000-0000-000000000000"],
            StudentId: ["00000000-0000-0000-0000-000000000000"],
            evaluationDate: [""],
            PageNumber: [1],
        });

        return this.searchForm;
    }

    public getPoeme()
    {
        return this.http.get(consts.FRONT_URL + "assets/files/moutoun.json");
    }

    private initializeMoutounPoeme(): MoutounPoeme
    {
        return {
            Id: 0,
            Title: '',
            File: '',
            SchoolId: 0
        };
    }

    GetMoutounPoemeDocPath(document: string)
    {
        var documentPath = consts.MOUTOUN_POEME_DOC_URL;
        if (document != "" && document != null && document != "0.pdf" && document != "0")
        {
            documentPath = documentPath + document;
        }

        return documentPath;
    }
    getMoutounPoemes(pagenumber): Observable<MoutounPoeme[]>
    {
        return this.http.get<MoutounPoeme[]>(
            consts.MOUTOUN_DETAIL_URL + "/MoutounPoemes?_pageNumber=" + pagenumber,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getAllMoutounPoemes(): Observable<MoutounPoeme[]>
    {
        return this.http.get<MoutounPoeme[]>(
            consts.MOUTOUN_DETAIL_URL + "/AllMoutounPoemes",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    createMoutounPoeme(formData: FormData): Observable<any>
    {
        let params = new HttpParams();
        // let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accessToken, });
        // headers.append('Content-Type', 'multipart/form-data');
        this.httpOptions.append('Content-Type', 'multipart/form-data');
        const options = { headers: this.httpOptions, params: params, reportProgress: true };

        return this.http.post(consts.MOUTOUN_DETAIL_URL + "/MoutounPoeme", formData, options);
    }

    UpdateMoutounPoeme(id: number, formData: FormData): Observable<any>
    {
        let params    = new HttpParams();
        // let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accessToken, });
        // headers.append('Content-Type', 'multipart/form-data');

        this.httpOptions.append('Content-Type', 'multipart/form-data');
        const options = { headers: this.httpOptions, params: params, reportProgress: true };

        return this.http.put(consts.MOUTOUN_DETAIL_URL + "/MoutounPoeme/" + id, formData, options);
    }

    getMoutounRecitaionsSessions(): Observable<any[]>
    {
        return this.http.get<any[]>(
            consts.MOUTOUN_DETAIL_URL + "/MoutounRecitations",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getMoutounEvaluationDates(): Observable<any[]>
    {
        return this.http.get<any[]>(
            consts.MOUTOUN_DETAIL_URL + "/MoutounEvaluationDates",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    GetMoutounPoemeById(id: number)
    {
        if (id === -1) {
            return of(this.initializeMoutounPoeme());
        }

        return this.http.get<MoutounPoeme>(consts.MOUTOUN_DETAIL_URL + "/MoutounPoeme/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    DeleteMoutounPoeme(id: number): Observable<MoutounPoeme>
    {
        return this.http.delete<MoutounPoeme>(consts.MOUTOUN_DETAIL_URL + "/MoutounPoeme/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    getMoutouns(): Observable<any[]>
    {
        return this.http.get<any[]>(consts.MOUTOUN_DETAIL_URL, { withCredentials: true, headers: this.httpOptions });
    }

    SearchMoutouns(pageNumber: number, studentId: number, teacherId: number, evaluationDate: Date, recitationId: number): Observable<any[]>
    {
        return this.http.get<any[]>(
            consts.MOUTOUN_DETAIL_URL + "/Search?pageNumber=" + pageNumber + "&studentId=" + studentId + "&teacherId=" + teacherId + "&evaluationDate=" + evaluationDate + "&recitationId=" + recitationId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    changeRecitationDetail(recitationDetailId)
    {
        this.recitationDetail.next(recitationDetailId);
    }

    changeItem(item)
    {
        this.item.next(item);
    }

    GetMoutounById(id: number)
    {
        return this.http.get<MoutounDetail>(consts.MOUTOUN_DETAIL_URL + "/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    deleteMoutounDetail(id: number): Observable<MoutounDetail>
    {
        return this.http.delete<MoutounDetail>(consts.MOUTOUN_DETAIL_URL + "/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    GetStudentHistorique(studentId: number, recitationId: number)
    {
        return this.http.get<MoutounDetail[]>(consts.MOUTOUN_DETAIL_URL + "/StudentHistorique/" + studentId + "/" + recitationId, { withCredentials: true, headers: this.httpOptions });
    }
    createMoutounDetail(recitationDetail: MoutounDetail): Observable<MoutounDetail>
    {
        return this.http.post<MoutounDetail>(consts.MOUTOUN_DETAIL_URL, recitationDetail, { withCredentials: true, headers: this.httpOptions });
    }

    updateMoutounDetail(moutounDetail: MoutounDetail): Observable<MoutounDetail>
    {
        return this.http.put<MoutounDetail>(consts.MOUTOUN_DETAIL_URL + "/" + moutounDetail.Id, moutounDetail, { withCredentials: true, headers: this.httpOptions });
    }

    GetFiltredStudentHistorique(studentId: number, recitationId: number, Poeme, OrderBy)
    {
        return this.http.get<MoutounDetail[]>(consts.MOUTOUN_DETAIL_URL + "/FiltredStudentHistorique/" + studentId + "/" + recitationId + "/" + Poeme + "/" + OrderBy, { withCredentials: true, headers: this.httpOptions });
    }
}