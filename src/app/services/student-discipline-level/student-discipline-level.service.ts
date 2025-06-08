import { Injectable              } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StudentDisciplineLevel  } from '@models/student-discipline-level';
import { Observable              } from 'rxjs';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class StudentDisciplineLevelService
{
    private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + this.accessToken
        })
    };

    constructor(private http: HttpClient)
    { }

    getStudentDisciplineLevel(studentId: number, disciplineId: number): Observable<StudentDisciplineLevel>
    {
        return this.http.get<StudentDisciplineLevel>(consts.STUDENT_DISCIPLINELEVEL_URL + "?studentId=" + studentId.toString() + "&disciplineId=" + disciplineId, this.httpOptions)
    }
}