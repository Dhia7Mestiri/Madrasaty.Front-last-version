import { Injectable      } from '@angular/core';
import { Assiduite       } from '@models/assiduite';
import { Observable,
         BehaviorSubject } from 'rxjs';
import { tap, map        } from 'rxjs/operators';
import { HttpClient      } from '@angular/common/http';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class AssiduiteService
{
    courseSessionId: number;
    levelId: number;
    disciplineId: number;

    httpOptions: any;
    assiduiteIdSource = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient)
    {
        this.httpOptions = getAccessToken();
    }

    getAssiduites(courseSessionId: number, levelId: number, disciplineId: number): Observable<Assiduite[]>
    {
        return this.http.get<Assiduite[]>(
            consts.ASSIDUITE_URL + "?courseId=" + courseSessionId + "&levelId=" + levelId + "&DisciplineId=" + disciplineId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    updateAssiduite(assiduite: Assiduite): Observable<Assiduite>
    {
        return this.http.put<Assiduite>(consts.ASSIDUITE_URL, assiduite, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(() => console.log('updateAssiduite: ' + assiduite.Id)),
                map(() => assiduite)

            );
    }

    updateAllAssiduite(model)
    {
        return this.http.post(
            consts.ASSIDUITE_URL + "/" + model.CourseSessionId + "/" + model.DisciplineId + "/" + model.LevelId + "/" + model.Present,
            null,
            { withCredentials: true, headers: this.httpOptions }
        );
    }
}