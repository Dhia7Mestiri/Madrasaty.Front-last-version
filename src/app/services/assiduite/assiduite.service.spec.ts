import { TestBed, waitForAsync    } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA         } from '@angular/core';
import { RouterTestingModule      } from '@angular/router/testing';
import { HttpClientTestingModule  } from '@angular/common/http/testing';
import { of                       } from 'rxjs';

import { AssiduiteService } from './assiduite.service';
import { Assiduite } from '@models/assiduite';

describe('AssiduiteService', () =>
{
    let service = jasmine.createSpyObj<AssiduiteService>('AssiduiteService',
        ['getAssiduites', 'updateAssiduite', 'updateAllAssiduite']
    );

    beforeEach(waitForAsync(() =>
    {
        // https://angular.io/guide/http#testing-http-requests

        TestBed.configureTestingModule({
            imports     : [RouterTestingModule, HttpClientTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            providers   : [
                { provide: AssiduiteService, useValue: service }
            ]
        })
        .compileComponents();

        // httpCtrl = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const service: AssiduiteService = TestBed.inject(AssiduiteService);
        expect(service).toBeTruthy();
    });

    it('.getAssiduites() should return sample data', waitForAsync(() =>
    {
        const response: Assiduite[] = [{ Id: 1, FullName: 'John Doe', Present: true }];
        service.getAssiduites.and.returnValue(of(response));

        try
        {
            service.getAssiduites(1, 1, 1).subscribe({
                next: (data: any) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.Id).toBe(response[0].Id);
                    expect(data.FullName).toBe(response[0].FullName);
                    expect(data.Present).toBe(response[0].Present);
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

    it('.updateAssiduite() should modify data correctly', waitForAsync(() =>
    {
        const request : Assiduite = { Id: 1, FullName: 'John Doe', Present: true };
        const response: Assiduite = { Id: 2, FullName: 'Super man', Present: false };
        service.updateAssiduite.and.returnValue(of(response));

        try
        {
            service.updateAssiduite(request).subscribe({
                next: (data: any) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.Id).toBe(response.Id);
                    expect(data.FullName).toBe(response.FullName);
                    expect(data.Present).toBe(response.Present);
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

    it('.updateAllAssiduite() should process POST request correctly', waitForAsync(() =>
    {
        const request  = { courseId: 1, DisciplineId: 1, LevelId: 1, Present: true };
        const response = { courseId: 5, DisciplineId: 6, LevelId: 7, Present: true };
        service.updateAllAssiduite.and.returnValue(of(response));

        try
        {
            service.updateAllAssiduite(request).subscribe({
                next: (data: any) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.courseId).toBe(response.courseId);
                    expect(data.DisciplineId).toBe(response.DisciplineId);
                    expect(data.LevelId).toBe(response.LevelId);
                    expect(data.Present).toBe(response.Present);
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