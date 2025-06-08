import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { Observable     } from 'rxjs';
import { map            } from 'rxjs/operators';

import { Examen         } from '@models/examen';
import { CalendarEvent  } from '@models/calendar-event';
import { Course         } from '@models/course';
import { Event          } from '@models/Event';
import { Holiday        } from '@models/holiday';
import { getAccessToken } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class CalendarService
{
    httpOptions: any;

    constructor(private httpclient: HttpClient)
    {
        this.httpOptions = getAccessToken();
    }

    public getEvents(): Observable<CalendarEvent[]>
    {
        return this.httpclient.get<Event[]>(consts.EVENTS_URL, { withCredentials: true, headers: this.httpOptions }).pipe(
            map((data: Event[]) => data?.map((item: Event) => {
                const model = new CalendarEvent();
                Object.assign(model, item);
                model.id = item.Id
                model.title = item.Title;
                model.date = item.StartDate.toString();
                model.start = item.StartDate.toString();
                model.end = item.EndDate.toString();
                model.eventType = "events"
                model.color = "Blue"
                return model;
            }))
        );
    }

    public getExamensEvent(): Observable<CalendarEvent[]>
    {
        return this.httpclient.get<Examen[]>(consts.API_URL + "Examen/ExamensForCalender" , { withCredentials: true, headers: this.httpOptions }).pipe(
            map((data: Examen[]) => data.map((item: Examen) => {
                const model = new CalendarEvent();
                Object.assign(model, item);
                model.id = item.Id
                model.title = item.Name;
                model.date = item.StartDate.toString();
                model.start = item.StartDate.toString();
                model.end = item.EndDate.toString();
                model.eventType = "examen"
                model.color = "Red"
                return model;
            }))
        );
    }

    //#region Get Courses as Events
    public getCoursEvent(): Observable<CalendarEvent[]>
    {
        return this.httpclient.get<CalendarEvent[]>(consts.COURSE_URL +"CoursesForCalender", { withCredentials: true, headers: this.httpOptions }).pipe(
            map((data: CalendarEvent[]) => data.map((item: CalendarEvent) => {
                const model = new CalendarEvent();
                Object.assign(model, item);
                model.id = item.id
                model.title = item.title;
                //model.date = item.start.toString();
                model.start = item.start.toString();
                model.end = item.end.toString();
                model.eventType = "course"
                model.color = item.color
                return model;
            }))
        );
    }

    public getHolidaysEvent(): Observable<CalendarEvent[]>
    {
        return this.httpclient.get<CalendarEvent[]>(consts.API_URL + "VacanceScolaires/VacanceScolairesForCalender", { withCredentials: true, headers: this.httpOptions }).pipe(
            map((data: CalendarEvent[]) => data.map((item: CalendarEvent) => {
                const model = new CalendarEvent();
                Object.assign(model, item);
                model.id = item.id
                model.title = item.title;
                model.start = item.start.toString();
                model.end = item.end.toString();
                model.eventType = "holiday"
                model.color = item.color
                return model;
            }))
        );
    }
    //#endregion
}