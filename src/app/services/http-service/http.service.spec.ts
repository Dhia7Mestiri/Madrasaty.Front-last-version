import { TestBed, waitForAsync   } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA        } from '@angular/core';
import { RouterTestingModule     } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of                      } from 'rxjs';

import { HttpService             } from '@services/http-service/http.service';

describe('httpService', () =>
{
    // let httpCtrl: HttpTestingController;
    let http = jasmine.createSpyObj<HttpService>('HttpService', ['read', 'update', 'delete', 'create']);

    beforeEach(waitForAsync(() =>
    {
        // https://angular.io/guide/http#testing-http-requests

        TestBed.configureTestingModule({
            imports     : [RouterTestingModule, HttpClientTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            providers   : [
                { provide: HttpService, useValue: http }
            ]
        })
        .compileComponents();

        // httpCtrl = TestBed.inject(HttpTestingController);
    }));

    // afterEach(() =>
    // {
    //     // Assert that there are no more pending requests
    //     httpCtrl.verify();
    // });

    it('http.read() should return sample data', waitForAsync(() =>
    {
        const response = { id: 1, name: 'John Doe' };
        http.read.and.returnValue(of(response));

        try
        {
            http.read('http://fake.com/data.json', false).subscribe({
                next: (data: any) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data.id).toBe(response.id);
                    expect(data.name).toBe(response.name);
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

    it('http.create() should POST data', waitForAsync(() =>
    {
        const data     = 'Test';
        const response = '1';
        http.create.and.returnValue(of(response));

        try
        {
            http.create<string>('http://fake.com/data.json', data).subscribe({
                next: (data: string) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data).toBe(response);
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

    it('http.update() should modify data', waitForAsync(() =>
    {
        const data    = 'Data';
        const response= 'Modified';
        http.update.and.returnValue(of(response));

        try
        {
            http.update<string>('http://fake.com/data.json', data).subscribe({
                next: (data: string) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data).toBe(response);
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

    it('http.delete() should delete data', waitForAsync(() =>
    {
        http.delete.and.returnValue(of(null));

        try
        {
            http.delete('http://fake.com/data.json').subscribe({
                next: (data: any) =>  // HttpResponse<any>
                {
                    console.log(data);

                    expect(data).toBe(null);
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