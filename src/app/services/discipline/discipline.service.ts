import { Injectable            } from '@angular/core';
import { FormBuilder,
         FormGroup, Validators } from '@angular/forms';
import { HttpClient            } from '@angular/common/http';

import { Discipline            } from '@models/discipline';
import { Observable,
         of, BehaviorSubject   } from 'rxjs';
import { tap, map              } from 'rxjs/operators';
import { getAccessToken        } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class DisciplineService
{
    disciplineIdSource = new BehaviorSubject<number>(0);
    disciplineIdData: Observable<number>;
    DisciplineForm: FormGroup;
    httpOptions: any;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.disciplineIdData = this.disciplineIdSource.asObservable();
        this.httpOptions      = getAccessToken();
    }

    createDisciplineForm()
    {
        this.DisciplineForm = this.formBuilder.group({
            Name: ["", Validators.required],
            Description: ["", Validators.required],
            SchoolId: []
        });

        return this.DisciplineForm;
    }

    getDisciplines(SchoolId: number, pagenumber: number): Observable<Discipline[]>
    {
        return this.http.get<Discipline[]>(consts.DISCIPLINE_URL+"?schoolId="+SchoolId+"&_pageNumber="+pagenumber, { withCredentials: true, headers: this.httpOptions });
    }

    getDisciplinesList(SchoolId): Observable<Discipline[]>
    {
        return this.http.get<Discipline[]>(consts.DISCIPLINE_URL+"DisciplinesList"+"?schoolId="+SchoolId, { withCredentials: true, headers: this.httpOptions });
    }

    getDisciplinesCount(): Observable<number>
    {
        return this.http.get<number>(consts.DISCIPLINE_URL +"/CountOfDisciplines" , { withCredentials: true, headers: this.httpOptions });
    }

    getDiscipline(id: number): Observable<Discipline>
    {
        if (id === -1) {
            return of(this.initializeDiscipline());
        }
        return this.http.get<Discipline>(consts.DISCIPLINE_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    createDiscipline(discipline: Discipline): Observable<Discipline>
    {
        return this.http.post<Discipline>(consts.DISCIPLINE_URL, discipline, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('createDiscipline: ' + JSON.stringify(data)),
                    error => console.log(error)
                ),
            );
    }

    updateDiscipline(discipline: Discipline): Observable<Discipline>
    {
        return this.http.put<Discipline>(consts.DISCIPLINE_URL + discipline.Id, discipline, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(() => console.log('updateDiscipline: ' + discipline.Id)),
                map(() => discipline)
            );
    }

    deleteDiscipline(id: number): Observable<Discipline>
    {
        return this.http.delete<Discipline>(consts.DISCIPLINE_URL + id, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('deleteDiscipline: ' + id),
                    error => console.log(error))
            );
    }

    changeDisciplineId(disciplineId: number)
    {
        this.disciplineIdSource.next(disciplineId);
    }

    private initializeDiscipline(): Discipline
    {
        return {
            Id: 0,
            Name: null,
            Description: null,
            SchoolId: 0
        };
    }
}