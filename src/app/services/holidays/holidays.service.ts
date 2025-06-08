import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { BehaviorSubject,
         Observable, of } from 'rxjs';
import { FormBuilder,
         FormGroup,
         Validators     } from '@angular/forms';
import { Holiday        } from '@models/holiday';
import { getAccessToken } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class HolidaysService
{
    private httpOptions: any;
    private holidayForm: FormGroup;
    private holidayIdSource = new BehaviorSubject<number>(0);

    constructor(private httpclient: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createHolidayForm()
    {
        this.holidayForm = this.formBuilder.group({
            Id: [""],
            StartDate: ["", Validators.required],
            EndDate: ["", Validators.required],
            Name: ["", Validators.required],
            SchoolId: []
        });
        return this.holidayForm
    }

    public getHolidays(schoolId: number, pagenumber: number, search: string): Observable<Holiday[]>
    {
        return this.httpclient.get<Holiday[]>(
            consts.VACANCES_URL,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    changeHolidayId(holiayId: number)
    {
        this.holidayIdSource.next(holiayId);
    }

    getHoliday(id: number): Observable<Holiday>
    {
        if (id === -1)
        {
            return of(this.initializeHoliday());
        }

        return this.httpclient.get<Holiday>(consts.VACANCES_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    getHolidaysCount(schoolId: number): Observable<number>
    {
        return this.httpclient.get<number>(
            consts.VACANCES_URL + "VacanceScolairesCount" + "?schoolId=" + schoolId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    createHoliday(holiday: Holiday): Observable<Holiday>
    {
        return this.httpclient.post<Holiday>(consts.VACANCES_URL, holiday, { withCredentials: true, headers: this.httpOptions });
    }

    updateHoliday(holiday: Holiday): Observable<Holiday>
    {
        return this.httpclient.put<Holiday>(consts.VACANCES_URL + holiday.Id, holiday, { withCredentials: true, headers: this.httpOptions });
    }

    deleteHoliday(id: number): Observable<Holiday>
    {
        return this.httpclient.delete<Holiday>(consts.VACANCES_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    private initializeHoliday(): Holiday
    {
        return {
            Id: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            Name: '',
            SchoolId: 0,
            Recurrence:0
        };
    }
}