import { Injectable                 } from '@angular/core';
import { HttpClient                 } from '@angular/common/http';
import { FormBuilder, FormGroup,
         Validators                 } from '@angular/forms';
import { Observable, of,
         BehaviorSubject            } from 'rxjs';
import { tap                        } from 'rxjs/operators';

import { Session                    } from '@models/session';
import { Recurrence                 } from '@models/recurrence';
import { RecitationSessionModel     } from '@models/recitation-session-model';
import { RecitationSessionPostModel } from '@models/recitation-session-post-model';
import { getAccessToken             } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class SessionService
{
    sessionIdSource = new BehaviorSubject<number>(0);
    httpOptions: any;
    MoutounsessionForm: FormGroup;
    reccurenceFormGroup: FormGroup;
    TasmiiSessionForm: FormGroup;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createTasmiiSessionForm()
    {
        this.TasmiiSessionForm = this.formBuilder.group({
            Id: [0],
            Title: ['', Validators.required],
            Description: ['', Validators.required],
            RecurrenceId: ['', Validators.required],
            DisciplineId: ['', Validators.required],
            LevelIds: [[], Validators.required],
            StartDate: [new Date(), Validators.required],
Begin: [new Date(), Validators.required],
End: [new Date(), Validators.required],
            DivisionParam: ['', Validators.required],
EndTime: [new Date(), Validators.required],
            TeacherId: ['', Validators.required],
            IsSaved: [true],
            ClassroomId: ['', Validators.required],
            TypeEvaluation: ['T'],
            Jour: [''],
            T1: [''],
            T2: [''],
            T3: [''],
        });

        return this.TasmiiSessionForm;
    }
    createMoutounSessionForm() {

        this.MoutounsessionForm = this.formBuilder.group({
            Id: [0],
            Title: ['', Validators.required],
            Description: ['', Validators.required],
            RecurrenceId: ['', Validators.required],
            DisciplineId: ['', Validators.required],
            LevelIds: [[], Validators.required],
            StartDate: ['', new Date()],
            Begin: [''],
            End: [''],
            DivisionParam: ['', Validators.required],
            EndTime: ['', new Date()],
            TeacherId: ['', Validators.required],
            IsSaved: [true],
            ClassroomId: ['', Validators.required],
            TypeEvaluation: ['M'],
            Jour: [''],
            T1: [''],
            T2: [''],
            T3: [''],
        });

        return this.MoutounsessionForm;
    }

    /*getSessions(SessionType, pagenumber: number, search: string): Observable<Session[]> {
        return this.http.get<Session[]>(
            consts.SESSION_URL + "RecitationType/" + SessionType + "?_pageNumber=" + pagenumber + "&search=" + search,
            { withCredentials: true, headers: this.httpOptions }
        );
    }*/
   getSessions(pagenumber: number, search: string): Observable<any> {
    return this.http.get<any>(
        `${consts.SESSION_URL}Tasmii?_pageNumber=${pagenumber}&search=${search}`,
        { withCredentials: true, headers: this.httpOptions }
    );
}

    changeSessionId(sessionId: number)
    {
        this.sessionIdSource.next(sessionId);
    }

    getReccurence(): Observable<Recurrence[]>
    {
        return this.http.get<Recurrence[]>(consts.RECURRENCE_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getRecitationDisciplineLevels(id: number): Observable<any[]>
    {
        return this.http.get<any[]>(consts.API_URL + "RecitationDisciplineLevels/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    GetStudentsByRecitationId(id: number): Observable<any[]>
    {
        return this.http.get<any[]>(consts.API_URL + "StudentRecitation/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    getSession(id: number): Observable<RecitationSessionModel>
    {
        if (id === -1) {
            return of(this.initializeSession());
        }
        return this.http.get<RecitationSessionModel>(consts.SESSION_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

     initializeSession(): RecitationSessionModel
    {
        return {
            Id: 0,
            Title: '',
            IsSaved: true,
            TeacherId: '',
            ClassroomId: 0,
            Description: '',
            StartDate: new Date(),
            EndTime: new Date(),
            Begin: new Date(),
            End: new Date(),
            DivisionParam: 0,
            CreatedOn: new Date(),
            ModifiedOn: new Date(),
            RecurrenceId: 0,
            DisciplineId: 0,
            IdStudents: [],
            TypeEvaluation: '',
            Jour: '',
            T1: new Date(Date.now()),
            T2: new Date(Date.now()),
            T3: new Date(Date.now()),
        };
    }

    createSession(session: RecitationSessionPostModel): Observable<RecitationSessionPostModel>
    {
        console.log(session);
        return this.http.post<RecitationSessionPostModel>(consts.SESSION_URL, session, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('createSession: ' + JSON.stringify(data)),
                    error => console.log(error)
                ),
            );
    }

    updateSession(session: RecitationSessionPostModel): Observable<RecitationSessionPostModel>
    {
        return this.http.put<RecitationSessionPostModel>(consts.SESSION_URL + session.Id, session, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('updateSession: ' + JSON.stringify(data)),
                    error => console.log(error)
                ),
            );
    }

    deleteSession(id: number): Observable<RecitationSessionPostModel>
    {
        return this.http.delete<RecitationSessionPostModel>(consts.SESSION_URL + id, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('deleteSession: ' + id),
                    error => console.log(error))
            );
    }
}