import { Injectable      } from '@angular/core';
import { HttpClient      } from '@angular/common/http';
import { Observable,
         BehaviorSubject } from 'rxjs';
import { FormBuilder,
         FormGroup,
         Validators      } from '@angular/forms';

import { CourseSession   } from '@models/courseSession';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class CourseSessionService
{
    httpOptions: any;
    courseSessionIdSource = new BehaviorSubject<number>(0);
    courseSessionForm: FormGroup;
    searchForm: FormGroup;
    courseSessionHistoriquForm: FormGroup;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions = getAccessToken();
    }

    createCourseSessionForm()
    {
        this.courseSessionForm = this.formBuilder.group({
            Wording: ['', Validators.required],
            Remarque: ['', Validators.required]
        });

        return this.courseSessionForm;
    }

    SearchCourseSessionHistoriqueForm()
    {
        this.searchForm = this.formBuilder.group({
            CourseId: [0],
            TeacherId: ["00000000-0000-0000-0000-000000000000"],
            PageNumber: [1],
        });

        return this.searchForm;
    }

    CourseSessionHistoriqueForm()
    {
        this.courseSessionHistoriquForm = this.formBuilder.group({
            Id: [],
            CourseId: [''],
            Wording: [''],
            Course: [''],
            StartDate: [],
            EndTime: [],
            Remarque: [''],
            End: [],
            Begin: [''],

        });

        return this.courseSessionHistoriquForm;
    }

    getCourseSession(Id: number): Observable<CourseSession[]>
    {
        return this.http.get<CourseSession[]>(consts.COURSE_SESSION_URL + Id, { withCredentials: true, headers: this.httpOptions });
    }

    getCourseSessionsByCourseId(CourseId: number): Observable<CourseSession[]>
    {
        return this.http.get<CourseSession[]>(consts.COURSE_URL + CourseId, { withCredentials: true, headers: this.httpOptions });
    }

    getCourseSessions(): Observable<CourseSession[]>
    {
        return this.http.get<CourseSession[]>(consts.COURSE_SESSION_URL, { withCredentials: true, headers: this.httpOptions });
    }

    createCourseSession(courseSession: CourseSession): Observable<CourseSession>
    {
        return this.http.post<CourseSession>(consts.COURSE_SESSION_URL, courseSession, { withCredentials: true, headers: this.httpOptions });
    }

    updateCourseSession(courseSession: CourseSession): Observable<CourseSession>
    {
        return this.http.put<CourseSession>(consts.COURSE_SESSION_URL + courseSession.Id, courseSession, { withCredentials: true, headers: this.httpOptions });
    }

    deleteCourseSession(id: number): Observable<CourseSession>
    {
        return this.http.delete<CourseSession>(consts.COURSE_SESSION_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    GetCoursesHistoriqueByCourseId(id)
    {
        return this.http.get<CourseSession[]>(consts.COURSE_SESSION_URL + "CoursesSessionsByCourseId/" + id, { withCredentials: true, headers: this.httpOptions });
    }

    SearchCoursSession(pageNumber, teacherId, coureId): Observable<any[]>
    {
        return this.http.get<any[]>(
            consts.COURSE_SESSION_URL + "/Search" + "?pageNumber=" + pageNumber + "&teacherId=" + teacherId + "&coureId=" + coureId,
            { withCredentials: true, headers: this.httpOptions }
        );
    }
}