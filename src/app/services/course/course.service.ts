import { Injectable      } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators      } from '@angular/forms';
import { Observable, of,
         BehaviorSubject } from 'rxjs';
import { HttpClient      } from '@angular/common/http';

import { Course          } from '@models/course';
import { Recurrence      } from '@models/recurrence';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class CourseService
{
    courseIdSource = new BehaviorSubject<number>(0);
    courseIdData   : Observable<number>;
    courseForm     : FormGroup;
    httpOptions    : any;

    constructor(private http: HttpClient,	private formBuilder: FormBuilder)
    {
        this.courseIdData = this.courseIdSource.asObservable();
        this.httpOptions  = getAccessToken();
    }


    createCourseForm(){
        this.courseForm = this.formBuilder.group({      
            Name: ['', Validators.required],
            SupervisorId: [new Date(), Validators.required],
            DisciplineId: ['', Validators.required],
            Level: ['', Validators.required],
            Coefficient: ['', Validators.required],
            Active: ['', Validators.required],       
          });
    return this.courseForm
    }

    getCourses(schoolId,pagenumber,search): Observable<Course[]> {
        return this.http.get<Course[]>(consts.COURSE_URL + "?schoolId="+schoolId+ "&_pageNumber="+pagenumber+"&search="+search, { withCredentials: true, headers: this.httpOptions });
    }
    getStudentsByCourseId(pagenumber,CourseId): Observable<Course[]> {
        return this.http.get<Course[]>(consts.COURSE_URL + "StudentsByCourseId"+"?_pageNumber="+pagenumber+"&CourseId="+CourseId, { withCredentials: true, headers: this.httpOptions });
    }

    getCourse(id): Observable<Course>
    {
        if (id === -1)
        {
            return of(this.initializeCourse());
        }
        return this.http.get<Course>(consts.COURSE_URL + id, { withCredentials: true, headers: this.httpOptions });
    }


    getCoursesTitleForSearch(schoolId): Observable<any[]>
    {
        return this.http.get<any[]>(consts.COURSE_URL + "CoursesList"+"?schoolId="+schoolId, { withCredentials: true, headers: this.httpOptions });
    }

    createCourse(course: Course): Observable<Course>
    {
        return this.http.post<Course>(consts.COURSE_URL, course, { withCredentials: true, headers: this.httpOptions });
    }

    updateCourse(course: Course): Observable<Course>
    {
        return this.http.put<Course>(consts.COURSE_URL + course.Id, course, { withCredentials: true, headers: this.httpOptions })
    }
    deleteCourse(id: number): Observable<Course>
    {
        return this.http.delete<Course>(consts.COURSE_URL + id, { withCredentials: true, headers: this.httpOptions })
    }
    changeCourseId(courseId: number)
    {
        this.courseIdSource.next(courseId);
    }
 
    getTeachers()
    {
        return this.http.get(consts.API_URL + "Members/Teachers", { withCredentials: true, headers: this.httpOptions });
    }

    getSubjects()
    {
        return this.http.get(consts.SUBJECT_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getPeriodicities()
    {
        return this.http.get(consts.PERIODICITY_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getReccurence(): Observable<Recurrence[]>
    {
        return this.http.get<Recurrence[]>(consts.RECURRENCE_URL, { withCredentials: true, headers: this.httpOptions })
    }

    private initializeCourse(): Course
    {
        return {
            Id: 0,
            Name: '',
            SupervisorId: 0,
            DisciplineId: 0,
            Level: 0,
            Coefficient: 0,
            Active: true,       
        };
    }
}