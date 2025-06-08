import { Injectable        } from '@angular/core';
import { Periodicity       } from '@models/periodicity';
import { HttpClient        } from '@angular/common/http';
import { Observable        } from 'rxjs';

import { SchoolyearService } from '@services/schoolyear/schoolyear.service';
import { SchoolYear        } from '@models/schoolyear';
import { getAccessToken    } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class PeriodicityService
{
    actifSchoolYear: SchoolYear;
    httpOptions    : any;

    constructor(private http: HttpClient, private schoolYearService: SchoolyearService)
    {
        this.httpOptions = getAccessToken();
    }


    getPeriodicitiesBySchoolYear(id: number)
    {
        return this.http.get<Periodicity[]>(consts.PERIODICITY_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    getPeriodicitiesByActifSchoolYear()
    {
        return this.http.get<Periodicity[]>(consts.PERIODICITY_URL + "Actif", { withCredentials: true, headers: this.httpOptions });
    }

    createPeriodicity(periodicity: Periodicity): Observable<Periodicity>
    {
        return this.http.post<Periodicity>(consts.PERIODICITY_URL, periodicity, { withCredentials: true, headers: this.httpOptions });
    }

    deletePeriodicity(id: number): Observable<Periodicity>
    {
        return this.http.delete<Periodicity>(consts.PERIODICITY_URL + id, { withCredentials: true, headers: this.httpOptions });
    }
}