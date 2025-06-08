import { Injectable               } from '@angular/core';
import { HttpClient               } from '@angular/common/http';
import { FormBuilder, FormGroup,
         Validators               } from '@angular/forms';
import { Observable, of,
         BehaviorSubject, Subject } from 'rxjs';

import { SchoolYear     } from '@models/schoolyear';
import { getAccessToken } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class SchoolyearService
{
    schoolYearIdSource        = new BehaviorSubject<number>(0);
    schoolYearIdData          : Observable<number>;
    private _refreshrequired$ = new Subject<any>();
    schoolYearForm            : FormGroup;
    httpOptions               : any;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.schoolYearIdData = this.schoolYearIdSource.asObservable();
        this.httpOptions      = getAccessToken();
    }

    createSchoolYearForm() {

        this.schoolYearForm = this.formBuilder.group({
            Name: ["", Validators.required],
            StartDate: [''],
            EndDate: [''],
            Recurrence: [],
            SchoolId: []
        });
        return this.schoolYearForm
    }

    get Refreshrequired()
    {
        return this._refreshrequired$.asObservable();
    }

    setRefreshrequired(obj: any)
    {
        this._refreshrequired$.next(obj);
    }

    getSchoolYears(schoolId, pagenumber, search): Observable<SchoolYear[]>
    {
        return this.http.get<SchoolYear[]>(consts.SCHOOLYEAR_URL + "?schoolId=" + schoolId + "&_pageNumber=" + pagenumber + "&search=" + search, { withCredentials: true, headers: this.httpOptions })
    }

    getSchoolYearsForExamens(schoolId): Observable<SchoolYear[]> {
        return this.http.get<SchoolYear[]>(consts.SCHOOLYEAR_URL + "SchoolYearsForExamens" + "?schoolId=" + schoolId, { withCredentials: true, headers: this.httpOptions })
    }

    getSchoolYearsCount(schoolId): Observable<number> {
        return this.http.get<number>(consts.SCHOOLYEAR_URL + "TermsCount" + "?schoolId=" + schoolId, { withCredentials: true, headers: this.httpOptions })
    }

    getSchoolYear(id: number): Observable<SchoolYear> {
        if (id === -1) {
            return of(this.initializeSchoolYear());
        }
        return this.http.get<SchoolYear>(consts.SCHOOLYEAR_URL + id, { withCredentials: true, headers: this.httpOptions })
    }
    getActifSchoolYear(): Observable<SchoolYear> {
        return this.http.get<SchoolYear>(consts.SCHOOLYEAR_URL + "Actif", { withCredentials: true, headers: this.httpOptions })
    }
    initializeSchoolYear(): SchoolYear {
        return {
            Id: 0,
            Name: null,
            StartDate: new Date(),
            EndDate: new Date(),
            SchoolId: 0,
            Recurrence: 0
        };
    }
    createSchoolYear(schoolyear: SchoolYear): Observable<SchoolYear> {
        return this.http.post<SchoolYear>(consts.SCHOOLYEAR_URL, schoolyear, { withCredentials: true, headers: this.httpOptions })
    }

    updateSchoolYear(schoolyear: SchoolYear): Observable<SchoolYear> {
        return this.http.put<SchoolYear>(consts.SCHOOLYEAR_URL + schoolyear.Id, schoolyear, { withCredentials: true, headers: this.httpOptions })
    }

    deleteSchoolYear(id: number): Observable<SchoolYear> {
        return this.http.delete<SchoolYear>(consts.SCHOOLYEAR_URL + id, { withCredentials: true, headers: this.httpOptions })
    }
    UpdateActifAnneeScolaire(id)
    {
        return this.http.put(consts.SCHOOLYEAR_URL + "UpdateActif?id=" + id, { withCredentials: true, headers: this.httpOptions })
    }

    changeSchoolYearId(Id: number)
    {
        this.schoolYearIdSource.next(Id);
    }
}