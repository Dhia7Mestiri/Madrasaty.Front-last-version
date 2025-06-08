import { Injectable      } from '@angular/core';
import { Observable,
         BehaviorSubject } from 'rxjs';
import { tap, map        } from 'rxjs/operators';
import { HttpClient      } from '@angular/common/http';

import { Presence        } from '@models/presence';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class PresenceService
{
    httpOptions: any;
    presenceIdSource = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient)
    {
        this.httpOptions = getAccessToken();
    }

    getPresences(courseId: number, levelId: number, disciplineId: number): Observable<Presence[]>
    {
        return this.http.get<Presence[]>(
            consts.PRESENCE_URL + "?courseId=" + courseId + "&levelId=" + levelId + "&DisciplineId=" + disciplineId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    updatePresence(presence: Presence): Observable<Presence>
    {
        return this.http.put<Presence>(consts.PRESENCE_URL, presence, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(() => console.log('updatePresence: ' + presence.Id)),
                map(() => presence)
            );
    }

    updateAllPresence(model)
    {
        return this.http.post(
            consts.PRESENCE_URL + "/" + model.CourseId + "/" + model.DisciplineId + "/" + model.LevelId + "/" + model.Present,
            null,
            { withCredentials: true, headers: this.httpOptions }
        );
    }
}