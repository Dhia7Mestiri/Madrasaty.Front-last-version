import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap            } from 'rxjs/operators';
import { FormBuilder,
         FormGroup      } from '@angular/forms';

import { Event          } from '@models/Event';
import { getAccessToken } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class EventsService
{
    eventForm: FormGroup;

    httpOptions: any;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createEventForm(eventDates)
    {
        this.eventForm = this.formBuilder.group({
            Id: [0],
            Title: ["Titre d'évènement..."],
            EndDate: [new Date(eventDates?.end)],
            StartDate: [new Date(eventDates?.start)],

            Role: [1],
            Description: ["Description de l'évènement... "]
        });

        return this.eventForm;
    }

    getEvents(): Observable<Event[]>
    {
        return this.http.get<Event[]>(consts.EVENTS_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getEvent(id: number): Observable<Event>
    {
        if (id === -1) {
            return of(this.initializeEvent());
        }
        return this.http.get<Event>(consts.EVENTS_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    createEvent(event): Observable<Event>
    {
        return this.http.post<Event>(consts.EVENTS_URL, event, { withCredentials: true, headers: this.httpOptions });
    }

    updateEvent(event): Observable<Event>
    {
        return this.http.put<Event>(consts.EVENTS_URL + event.Id, event, { withCredentials: true, headers: this.httpOptions });
    }

    deleteEvent(id: number): Observable<Event>
    {
        return this.http.delete<Event>(consts.EVENTS_URL + id, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('deleteEvent: ' + id),
                    error => console.log(error))
            );
    }

    private initializeEvent(): Event
    {
        return {
            Id: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            Title: '',
            Description: '',
            Role: '0',
        };
    }
}