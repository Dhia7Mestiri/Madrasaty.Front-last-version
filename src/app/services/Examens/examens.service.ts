import { Injectable     } from "@angular/core";
import { HttpClient     } from "@angular/common/http";
import { BehaviorSubject,
         Observable, of } from "rxjs";
import { FormBuilder,
         FormGroup,
         Validators     } from "@angular/forms";

import { Examen         } from "@models/examen";
import { ExamenNote     } from "@models/examen-note";

import { getAccessToken } from "@functions/access-token";
import { getCurrentUser } from "@functions/current-user";

import * as consts from '@consts/url.consts';

@Injectable()
export class ExamensService
{
    // private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
    // public MemberStatusId = JSON.parse(this.User).MemberStatusId;
    // public MemberUsername = JSON.parse(this.User).UserName;
    private ExamensUrl = consts.EXAMENS_URL;
    httpOptions = getAccessToken();
    examenIdSource = new BehaviorSubject<number>(0);
    examenIdData: any;
    currentUser: Examen;
    SearchForm: FormGroup
    ExamenForm: FormGroup;
    constructor(private httpclient: HttpClient, private formBuilder: FormBuilder)
    {
        this.examenIdData = this.examenIdSource.asObservable();
    }

    createExamenSearchForm() {
        this.SearchForm = this.formBuilder.group({
            ExamenId: [0],
            TeacherId: ["00000000-0000-0000-0000-000000000000"],
            Search: [""],
            ExamenDate: [""],
            PageNumber: [1],

        });
        return this.SearchForm;
    }

    createExamenForm() {
        this.ExamenForm = this.formBuilder.group({
            Id: [0],
            Name: [''],
            SupervisorId: [''],
            StartDate: [''],
            EndDate: [''],
            TermId: [''],
            CourseId: [''],
            IsDeleted: [false],
            Coefficient: ['', [Validators.required, Validators.min(1)]]
        });
        return this.ExamenForm
    }

    public getTeachers() {
        return this.httpclient.get(
            consts.API_URL + "Members/Teachers",
            this.httpOptions
        );
    }

    SearchExamens(pageNumber, teacherId, examenId, examenDate): Observable<any[]> {

        return this.httpclient.get<any[]>(this.ExamensUrl + "Search" + "?pageNumber=" + pageNumber + "&teacherId=" + teacherId + "&examenId=" + examenId + "&examenDate=" + examenDate, this.httpOptions);

    }

    public ExamensListForsearch(): Observable<Examen[]> {
        return this.httpclient.get<Examen[]>(
            this.ExamensUrl + "ExamensListForsearch",
            this.httpOptions
        );
    }

    public ExamensDatesForsearch(): Observable<Examen[]> {
        return this.httpclient.get<Examen[]>(
            this.ExamensUrl + "ExamensDates",
            this.httpOptions
        );
    }

    public getExamens(userId: number, pagenumber, search): Observable<Examen[]> {
        return this.httpclient.get<Examen[]>(
            this.ExamensUrl + "?userId=" + userId + "&_pageNumber=" + pagenumber + "&search=" + search,
            this.httpOptions
        );
    }

    public GetExamensByCourseIdAndTermId(pagenumber: number, CourseId: number, TermId: number): Observable<Examen[]> {
        return this.httpclient.get<Examen[]>(
            this.ExamensUrl + "ExamensByCourseId" + "?_pageNumber=" + pagenumber + "&CourseId=" + CourseId + "&TermId=" + TermId,
            this.httpOptions
        );
    }

    changeExamenId(examenId: number) {
        this.examenIdSource.next(examenId);
    }
    getExamen(id): Observable<Examen> {
        if (id === -1) {
            return of(this.initializeExamen());
        }
        return this.httpclient.get<Examen>(
            this.ExamensUrl + id,
            this.httpOptions
        );
    }
    private initializeExamen(): Examen {
        return {
            Id: 0,
            Name: "",
            SupervisorId: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            TermId: 0,
            CourseId: 0,
            IsDeleted: false,
            Coefficient: 0,
        }
    }
    getLevelsByDiscipline(id) {
        if (id == undefined) {
            return;
        }

        return this.httpclient.get<Examen>(
            consts.DISCIPLINE_LEVEL_URL + id,
            this.httpOptions
        );
    }

    createExamen(examen: Examen): Observable<Examen> {
        return this.httpclient.post<Examen>(
            this.ExamensUrl,
            examen,
            this.httpOptions
        )
    }
    updateExamen(examen): Observable<Examen> {
        return this.httpclient.put<Examen>(
            this.ExamensUrl + examen.Id,
            examen,
            this.httpOptions
        );
    }

    deleteExamen(id: number): Observable<Examen> {
        return this.httpclient.delete<Examen>(
            this.ExamensUrl + id,
            this.httpOptions
        );
    }

    getNotesExamen(pagenumber: number, examenId: number): Observable<ExamenNote[]> {
        return this.httpclient.get<ExamenNote[]>(consts.API_URL + "ExamenNotes/" + examenId + "?_pageNumber=" + pagenumber, this.httpOptions
        );
    }

    getExamenById(id: number): Observable<Examen> {
        if (id === -1) {
            return of(this.initializeExamen());
        }
        return this.httpclient.get<Examen>(
            this.ExamensUrl + id,
            this.httpOptions
        );
    }
    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return Error(errorMessage);
    }

    updateNoteExamen = function (model) {
        return this.httpclient.put(
            consts.API_URL + "ExamenNotes/",
            model,
            { withCredentials: true, headers: this.httpOptions }
        );
    };
}

/*
export class ExamensService
{
    httpOptions: any;
    public MemberStatusId = 0;
    public MemberUsername = "";
    examenIdSource = new BehaviorSubject<number>(0);
    examenIdData: Observable<number>;
    SearchForm: FormGroup
    ExamenForm: FormGroup;

    constructor(private httpclient: HttpClient, private formBuilder: FormBuilder)
    {
        this.examenIdData   = this.examenIdSource.asObservable();
        this.httpOptions    = getAccessToken();

        const user          = getCurrentUser();
        this.MemberStatusId = user ? JSON.parse(user['user']).MemberStatusId: 0;
        this.MemberUsername = user ? JSON.parse(user['user']).Username : "";
    }

    createExamenSearchForm()
    {
        this.SearchForm = this.formBuilder.group({
            ExamenId: [0],
            TeacherId: ["00000000-0000-0000-0000-000000000000"],
            Search: [""],
            ExamenDate: [""],
            PageNumber: [1],
        });

        return this.SearchForm;
    }

    createExamenForm()
    {
        this.ExamenForm = this.formBuilder.group({
            Id: [0],
            Name: [''],
            SupervisorId: [''],
            StartDate: [''],
            EndDate: ['',],
            TermId: [''],
            CourseId: [''],
            Coefficient: ['', [Validators.required, Validators.min(1)]]
        });

        return this.ExamenForm;
    }

    public getTeachers()
    {
        return this.httpclient.get(
            consts.API_URL + "Members/Teachers",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    SearchExamens(pageNumber: number, teacherId: number, examenId: number, examenDate: Date): Observable<any[]>
    {
        return this.httpclient.get<any[]>(
            consts.EXAMENS_URL + "Search" + "?pageNumber=" + pageNumber + "&teacherId=" + teacherId + "&examenId=" + examenId + "&examenDate=" + examenDate,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    public ExamensListForsearch(): Observable<Examen[]>
    {
        return this.httpclient.get<Examen[]>(
            consts.EXAMENS_URL + "ExamensListForsearch",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    public ExamensDatesForsearch(): Observable<Examen[]>
    {
        return this.httpclient.get<Examen[]>(
            consts.EXAMENS_URL + "ExamensDates",
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    public getExamens(userId: number, pagenumber, search): Observable<Examen[]>
    {
        return this.httpclient.get<Examen[]>(
            consts.EXAMENS_URL + "?userId=" + userId + "&_pageNumber=" + pagenumber + "&search=" + search,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    changeExamenId(examenId: number)
    {
        this.examenIdSource.next(examenId);
    }

    getExamen(id: number): Observable<Examen>
    {
        if (id === -1)
        {
            return of(this.initializeExamen());
        }
        return this.httpclient.get<Examen>(
            consts.EXAMENS_URL + id,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    private initializeExamen(): Examen
    {
        return {
            Id: 0,
            Name: "",
            Note: 0,
            SupervisorId: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            TermId: 0,
            CourseId: 0,
            Coefficient: 0,
        }
    }

    getLevelsByDiscipline(id)
    {
        if (id == undefined) {
            return;
        }

        return this.httpclient.get<Examen>(
            consts.DISCIPLINE_LEVEL_URL + id,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    createExamen(examen: Examen): Observable<Examen>
    {
        examen.EndDate = examen.StartDate;
        console.log("service" + examen);
        return this.httpclient.post<Examen>(
            consts.EXAMENS_URL,
            examen,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    updateExamen(examen: Examen): Observable<Examen>
    {
        return this.httpclient.put<Examen>(
            consts.EXAMENS_URL + examen.Id,
            examen,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    deleteExamen(id: number): Observable<Examen>
    {
        return this.httpclient.delete<Examen>(
            consts.EXAMENS_URL + id,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getNotesExamen(examen: Examen): Observable<ExamenNote[]>
    {
        return this.httpclient.get<ExamenNote[]>(
            consts.API_URL +
            "ExamenNotes/" +
            "?examenId=" +
            examen.Id +
            "&DisciplineId=" +
            examen +
            "&levelId=" +
            examen,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getExamenById(id: number): Observable<Examen>
    {
        if (id === -1)
        {
            return of(this.initializeExamen());
        }

        return this.httpclient.get<Examen>(
            consts.EXAMENS_URL + id,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    private handleError(err)
    {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return Error(errorMessage);
    }

    updateNoteExamen = function (model)
    {
        return this.httpclient.put(
            consts.API_URL + "ExamenNotes/",
            model,
            { withCredentials: true, headers: this.httpOptions }
        );
    };
}
// >>>>>>> c1a51d3310dda2bb2598a4cce7ea289806c31094 // */