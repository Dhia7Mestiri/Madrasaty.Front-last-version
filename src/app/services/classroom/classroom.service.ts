import { Injectable      } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators      } from '@angular/forms';
import { Observable , of,
         BehaviorSubject } from 'rxjs';
import { HttpClient      } from '@angular/common/http';

import { Classroom       } from '@models/classroom';
import { getAccessToken  } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class ClassroomService
{
    private httpOptions: any;

    classroomIdSource = new BehaviorSubject<number>(0);
    // classroomIdData: Observable<number>;
    classroomForm: FormGroup;

    constructor(private http: HttpClient,private formBuilder: FormBuilder)
    {
        // this.classroomIdData = this.classroomIdSource.asObservable();
        this.httpOptions = getAccessToken();
        // this.accessToken     = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
    }

    createClassroomsForm()
    {
        this.classroomForm = this.formBuilder.group({
            Name: ['', Validators.required],
            NumberProjector: [0, [Validators.required]],
            NumberDesk: [0, [Validators.required]],
            NumberChair: [0, [Validators.required]],
            SchoolId:[]
          });
          return  this.classroomForm
    }

    getClassrooms(schoolId: number, pagenumber: number, search: string): Observable<Classroom[]>
    {
        return this.http.get<Classroom[]>(
            consts.CLASSROOM_URL +"?schoolId=" + schoolId + "&_pageNumber=" + pagenumber + "&search=" + search,
            { withCredentials: true, headers: this.httpOptions }
        );
    }

    getClassroomsCount(): Observable<number>
    {
        return this.http.get<number>(consts.CLASSROOM_URL +"/CountOfClassrooms" , { withCredentials: true, headers: this.httpOptions });
      }

    getClassroomsList(): Observable<Classroom[]>
    {
        return this.http.get<Classroom[]>(consts.CLASSROOM_URL +"ClassroomsList", { withCredentials: true, headers: this.httpOptions });
    }

    getClassroom(id: number): Observable<Classroom>
    {
        if (id === -1) {
            return of(this.initializeClassroom());
        }
        return this.http.get<Classroom>(consts.CLASSROOM_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    createClassroom(classroom: Classroom): Observable<Classroom>
    {
        return this.http.post<Classroom>(consts.CLASSROOM_URL, classroom, { withCredentials: true, headers: this.httpOptions });
    }

    updateClassroom(classroom: Classroom): Observable<Classroom>
    {
        return this.http.put<Classroom>(consts.CLASSROOM_URL + classroom.Id, classroom, { withCredentials: true, headers: this.httpOptions });
    }

    deleteClassroom(id: number): Observable<Classroom>
    {
        return this.http.delete<Classroom>(consts.CLASSROOM_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    changeClassroomId(classroomId: number)
    {
        this.classroomIdSource.next(classroomId);
    }

    private initializeClassroom(): Classroom
    {
        return {
            Id: 0,
            Name : null,
            NumberProjector: null,
            NumberDesk: null,
            NumberChair: null,
            SchoolId:0
        };
    }
}