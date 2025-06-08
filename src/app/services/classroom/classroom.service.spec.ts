import { TestBed, waitForAsync   } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA        } from '@angular/core';
import { RouterTestingModule     } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of                      } from 'rxjs';

import { ClassroomService } from './classroom.service';
import { Classroom        } from '@models/classroom';

describe('ClassroomService', () =>
{
    let service = jasmine.createSpyObj<ClassroomService>('ClassroomService',
        ['getClassrooms', 'getClassroom', 'createClassroom', 'updateClassroom', 'deleteClassroom']
    );

    beforeEach(waitForAsync(() =>
    {
        // https://angular.io/guide/http#testing-http-requests

        TestBed.configureTestingModule({
            imports  : [RouterTestingModule, HttpClientTestingModule],
            schemas  : [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ClassroomService, useValue: service }
            ]
        })
        .compileComponents();

        // httpCtrl = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const service: ClassroomService = TestBed.inject(ClassroomService);
        expect(service).toBeTruthy();
    });

    it('.getClassrooms() should return sample data', waitForAsync(() =>
    {
        const response: Classroom[] = [{
            Id             : 1,
            SchoolId        : 5,
            Name        : 'Hello',
            NumberProjector: 1,
            NumberDesk     : 1,
            NumberChair    : 1
        }];
        service.getClassrooms.and.returnValue(of(response));

        try
        {
            service.getClassrooms(1,1,"").subscribe({
                next: (data: Classroom[]) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].Id).toBe(response[0].Id);
                    expect(data[0].Name).toBe(response[0].Name);
                    expect(data[0].NumberProjector).toBe(response[0].NumberProjector);
                    expect(data[0].NumberDesk).toBe(response[0].NumberDesk);
                    expect(data[0].NumberChair).toBe(response[0].NumberChair);
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

    it('.getClassroom() should process modify data correctly', waitForAsync(() =>
    {
        const response: Classroom = {
            Id       : 1,
            SchoolId : 5,
            Name  : 'Hello',
            NumberProjector: 1,
            NumberDesk     : 1,
            NumberChair    : 1
        };
        service.getClassroom.and.returnValue(of(response));

        try
        {
            service.getClassroom(1).subscribe({
                next: (data: Classroom) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.Id).toBe(response.Id);
                    expect(data.Name).toBe(response.Name);
                    expect(data.NumberProjector).toBe(response.NumberProjector);
                    expect(data.NumberDesk).toBe(response.NumberDesk);
                    expect(data.NumberChair).toBe(response.NumberChair);
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

    it('.createClassroom() should process POST request correctly', waitForAsync(() =>
    {
        const request: Classroom = {
            Id             : 2,
            SchoolId : 10,
            Name        : 'Hi',
            NumberProjector: 4,
            NumberDesk     : 5,
            NumberChair    : 6
        };
        const response: Classroom = {
            Id             : 1,
            SchoolId : 10,
            Name        : 'Hello',
            NumberProjector: 7,
            NumberDesk     : 8,
            NumberChair    : 9
        };
        service.createClassroom.and.returnValue(of(response));

        try
        {
            service.createClassroom(request).subscribe({
                next: (data: Classroom) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].Id).toBe(response[0].Id);
                    expect(data[0].Wording).toBe(response[0].Wording);
                    expect(data[0].NumberProjector).toBe(response[0].NumberProjector);
                    expect(data[0].NumberDesk).toBe(response[0].NumberDesk);
                    expect(data[0].NumberChair).toBe(response[0].NumberChair);
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

    it('.updateClassroom() should process POST request correctly', waitForAsync(() =>
    {
        const request: Classroom = {
            Id             : 2,
            SchoolId  :  5 , 
            Name         : 'Hi',
            NumberProjector: 4,
            NumberDesk     : 5,
            NumberChair    : 6
        };
        const response: Classroom = {
            Id             : 2,
            SchoolId  :  5 , 
            Name         : 'Hi',
            NumberProjector: 4,
            NumberDesk     : 5,
            NumberChair    : 6
        };
        service.updateClassroom.and.returnValue(of(response));

        try
        {
            service.updateClassroom(request).subscribe({
                next: (data: Classroom) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].Id).toBe(response[0].Id);
                    expect(data[0].Wording).toBe(response[0].Wording);
                    expect(data[0].NumberProjector).toBe(response[0].NumberProjector);
                    expect(data[0].NumberDesk).toBe(response[0].NumberDesk);
                    expect(data[0].NumberChair).toBe(response[0].NumberChair);
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

    it('.deleteClassroom() should process POST request correctly', waitForAsync(() =>
    {
        const response: Classroom = {
            Id             : 2,
            SchoolId  :  5 , 
            Name         : 'Hi',
            NumberProjector: 4,
            NumberDesk     : 5,
            NumberChair    : 6
        };
        service.deleteClassroom.and.returnValue(of(response));

        try
        {
            service.deleteClassroom(1).subscribe({
                next: (data: Classroom) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data[0].Id).toBe(response[0].Id);
                    expect(data[0].Wording).toBe(response[0].Wording);
                    expect(data[0].NumberProjector).toBe(response[0].NumberProjector);
                    expect(data[0].NumberDesk).toBe(response[0].NumberDesk);
                    expect(data[0].NumberChair).toBe(response[0].NumberChair);
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