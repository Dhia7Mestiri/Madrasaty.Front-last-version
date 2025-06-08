import { Injectable      } from '@angular/core';
import { HttpClient      } from '@angular/common/http';
import { Observable, of,
         BehaviorSubject } from 'rxjs';
import { Subject         } from '@models/subject';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class SubjectService
{
    subjectIdSource = new BehaviorSubject<number>(0);
    subjectIdData   : Observable<number>;
    httpOptions     : any;

    constructor(private http: HttpClient)
    {
        this.subjectIdData = this.subjectIdSource.asObservable();
        this.httpOptions   = getAccessToken();
    }

    getSubjects(): Observable<Subject[]>
    {
        return this.http.get<Subject[]>(consts.SUBJECT_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getSubject(id: number): Observable<Subject>
    {
        if (id === -1)
        {
            return of(this.initializeSubject());
        }
        return this.http.get<Subject>(consts.SUBJECT_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    createSubject(subject: Subject): Observable<Subject>
    {
        return this.http.post<Subject>(consts.SUBJECT_URL, subject, { withCredentials: true, headers: this.httpOptions });
    }

    updateSubject(subject: Subject): Observable<Subject>
    {
        return this.http.put<Subject>(consts.SUBJECT_URL + subject.Id, subject, { withCredentials: true, headers: this.httpOptions });
    }

    deleteSubject(id: number): Observable<Subject>
    {
        return this.http.delete<Subject>(consts.SUBJECT_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    changeSubjectId(subjectId: number)
    {
        this.subjectIdSource.next(subjectId);
    }

    private initializeSubject(): Subject
    {
        return {
            Id: 0,
            Name: null,
            Code: null,
            Coefficient: null,
            Description: null
        };
    }
}