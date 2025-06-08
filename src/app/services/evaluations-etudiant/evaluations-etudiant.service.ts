import { Injectable       } from '@angular/core';
import { HttpClient       } from '@angular/common/http';
import { Observable,
         BehaviorSubject  } from 'rxjs';
import { map              } from 'rxjs/operators';

import { RecitationDetail } from '@models/recitation-detail';
import { getAccessToken   } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class EvaluationsEtudiantService
{
    recitationId: number;
    studentId: number;
    httpOptions: any;

    evalIdSource = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient)
    {
        this.httpOptions = getAccessToken();
    }

    getEvaluations(studentId: number): Observable<RecitationDetail[]>
    {
        return this.http.get<RecitationDetail[]>(
            consts.STUDENT_RECITATION_DETAIL_URL + studentId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getSurahs(): Observable<string>
    {
        return this.http.get<string>(consts.QURAN_URL).pipe(map((data) => data["data"]));
    }
    public getPoemes(): Observable<any>
    {
        return this.http.get(consts.FRONT_URL + "assets/files/moutoun.json");
    }

    public getPoemesList(): Observable<{ name: string, number: number }[]>
    {
        return this.http.get<{ name: string, number: number }[]>(consts.FRONT_URL + "assets/files/moutoun.json");
    }
}