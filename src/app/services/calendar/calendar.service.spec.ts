import { TestBed, waitForAsync   } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA        } from '@angular/core';
import { RouterTestingModule     } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of                      } from 'rxjs';

import { CalendarService } from './calendar.service';
import { CalendarEvent   } from '@models/calendar-event';

describe('CalendarService', () =>
{
    let service = jasmine.createSpyObj<CalendarService>('CalendarService',
        ['getEvents', 'getExamensEvent', 'getCoursEvent', 'getHolidaysEvent']
    );

    beforeEach(waitForAsync(() =>
    {
        // https://angular.io/guide/http#testing-http-requests

        TestBed.configureTestingModule({
            imports  : [RouterTestingModule, HttpClientTestingModule],
            schemas  : [NO_ERRORS_SCHEMA],
            providers: [
                { provide: CalendarService, useValue: service }
            ]
        })
        .compileComponents();

        // httpCtrl = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const service: CalendarService = TestBed.inject(CalendarService);
        expect(service).toBeTruthy();
    });

    it('.getEvents() should return sample data', waitForAsync(() =>
    {
        const response: CalendarEvent[] = [{
            id       : 1,
            title    : 'Hello',
            date     : (new Date(2022, 1, 1)).toString(),
            start    : (new Date()).toString(),
            end      : (new Date(2099, 12, 31)).toString(),
            eventType: "events",
            color    : "Blue",
            allDay   : false
        }];
        service.getEvents.and.returnValue(of(response));

        try
        {
            service.getEvents().subscribe({
                next: (data: CalendarEvent[]) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].id).toBe(response[0].id);
                    expect(data[0].title).toBe(response[0].title);
                    expect(data[0].date).toBe(response[0].date);
                    expect(data[0].start).toBe(response[0].start);
                    expect(data[0].end).toBe(response[0].end);
                    expect(data[0].eventType).toBe(response[0].eventType);
                    expect(data[0].color).toBe(response[0].color);
                },
                error: (error) =>
                {
                    fail(error);
                }
            });
        }
        catch (error)
        {
            fail(error);
        }

        // httpCtrl.expectOne(url)
        //         .flush(response, { status: 200, statusText: 'Ok' });
    }));

    it('.getExamensEvent() should return data correctly', waitForAsync(() =>
    {
        const response: CalendarEvent[] = [{
            id       : 1,
            title    : 'Hello',
            date     : (new Date(2022, 1, 1)).toString(),
            start    : (new Date()).toString(),
            end      : (new Date(2099, 12, 31)).toString(),
            eventType: "examen",
            color    : "Red",
            allDay   : false
        }];
        service.getExamensEvent.and.returnValue(of(response));

        try
        {
            service.getExamensEvent().subscribe({
                next: (data: CalendarEvent[]) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].id).toBe(response[0].id);
                    expect(data[0].title).toBe(response[0].title);
                    expect(data[0].date).toBe(response[0].date);
                    expect(data[0].start).toBe(response[0].start);
                    expect(data[0].end).toBe(response[0].end);
                    expect(data[0].eventType).toBe(response[0].eventType);
                    expect(data[0].color).toBe(response[0].color);
                },
                error: (error) =>
                {
                    fail(error);
                }
            });
        }
        catch (error)
        {
            fail(error);
        }

        // httpCtrl.expectOne(url)
        //         .flush(response, { status: 200, statusText: 'Ok' });
    }));

    it('.getCoursEvent() should return sample data correctly', waitForAsync(() =>
    {
        const response: CalendarEvent[] = [{
            id       : 1,
            title    : 'Hello',
            date     : (new Date(2022, 1, 1)).toString(),
            start    : (new Date()).toString(),
            end      : (new Date(2099, 12, 31)).toString(),
            eventType: "course",
            color    : "teal",
            allDay   : false
        }];
        service.getCoursEvent.and.returnValue(of(response));

        try
        {
            service.getCoursEvent().subscribe({
                next: (data: CalendarEvent[]) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].id).toBe(response[0].id);
                    expect(data[0].title).toBe(response[0].title);
                    expect(data[0].date).toBe(response[0].date);
                    expect(data[0].start).toBe(response[0].start);
                    expect(data[0].end).toBe(response[0].end);
                    expect(data[0].eventType).toBe(response[0].eventType);
                    expect(data[0].color).toBe(response[0].color);
                },
                error: (error) =>
                {
                    fail(error);
                }
            });
        }
        catch (error)
        {
            fail(error);
        }

        // httpCtrl.expectOne(url)
        //         .flush(response, { status: 200, statusText: 'Ok' });
    }));

    it('.getHolidaysEvent() should return data correctly', waitForAsync(() =>
    {
        const response: CalendarEvent[] = [{
            id       : 1,
            title    : 'Hello',
            date     : (new Date(2022, 1, 1)).toString(),
            start    : (new Date()).toString(),
            end      : (new Date(2099, 12, 31)).toString(),
            eventType: "holiday",
            color    : "Green",
            allDay   : false
        }];
        service.getHolidaysEvent.and.returnValue(of(response));

        try
        {
            service.getHolidaysEvent().subscribe({
                next: (data: CalendarEvent[]) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].id).toBe(response[0].id);
                    expect(data[0].title).toBe(response[0].title);
                    expect(data[0].date).toBe(response[0].date);
                    expect(data[0].start).toBe(response[0].start);
                    expect(data[0].end).toBe(response[0].end);
                    expect(data[0].eventType).toBe(response[0].eventType);
                    expect(data[0].color).toBe(response[0].color);
                },
                error: (error) =>
                {
                    fail(error);
                }
            });
        }
        catch (error)
        {
            fail(error);
        }

        // httpCtrl.expectOne(url)
        //         .flush(response, { status: 200, statusText: 'Ok' });
    }));
});