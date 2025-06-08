import { TestBed, waitForAsync   } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA        } from '@angular/core';
import { RouterTestingModule     } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of                      } from 'rxjs';

import { CourseService } from './course.service';
import { Course        } from '@models/course';

describe('CourseService', () =>
{
    // let service = jasmine.createSpyObj<CourseService>('CourseService', [
    //     'getCourse',
    //     // Methods consists of just httpClient calls, nothing to test (we don't need to test httpClient!):
    //     'getCourses', 'createCourse', 'updateCourse', 'deleteCourse',
    //     'getDisciplines', 'getMembers', 'getSubjects', 'getPeriodicities', 'getReccurence'
    // ]);
    let service: jasmine.SpyObj<CourseService>; // Define service as SpyObj<CourseService>


    beforeEach(waitForAsync(() =>
    {
        // https://angular.io/guide/http#testing-http-requests

        TestBed.configureTestingModule({
            imports  : [RouterTestingModule, HttpClientTestingModule],
            schemas  : [NO_ERRORS_SCHEMA],
            providers: [
                { provide: CourseService, useValue: service }
            ]
        })
        .compileComponents();

        // httpCtrl = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const service: CourseService = TestBed.inject(CourseService);
        expect(service).toBeTruthy();
    });

    it('.getCourse() should return data correctly', waitForAsync(() =>
    {
        const response: Course = {
            Id               : 0,
            Name             : '',
            Level: 0,
            SupervisorId        : 0,
            DisciplineId : 2 , 
            Coefficient : 5, 
            Active : false 
        };
        service.getCourse.and.returnValue(of(response));

        try
        {
            service.getCourse(1).subscribe({
                next: (data: Course) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.Id).toBe(response.Id);
                    expect(data.Name).toBe(response.Name);
                    expect(data.Level).toBe(response.Level);
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

    it('.getCourse(-1) should return empty data', waitForAsync(() =>
    {
        const response: Course = {
            Id               : 0,
            Name             : '',
            Level: 0,
            SupervisorId        : 0,
            DisciplineId : 2 , 
            Coefficient : 5, 
            Active : false 
        };
        service.getCourse.and.returnValue(of(response));

        try
        {
            service.getCourse(-1).subscribe({
                next: (data: Course) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.Id).toBe(response.Id);
                    expect(data.Name).toBe(response.Name);
                    expect(data.Coefficient).toBe(response.Coefficient);
                    expect(data.DisciplineId).toBe(response.DisciplineId);
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