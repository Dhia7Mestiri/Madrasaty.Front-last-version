import { Injectable        } from '@angular/core';
import { HttpClient        } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

// Error handling common function
import { handleError       } from '@functions/error-message';

// import { AuthorizeService } from '@services/authorize-service/authorize.service';

@Injectable({
    providedIn: 'root'  // Provides service in AppModule
})
export class HttpService
{
    constructor(private http: HttpClient)  // , private auth: AuthorizeService)
    { }

    create<T>(URL: string, modelInBody: T, attachJwtToken?: boolean): Observable<T>
    {
        // ==============
        // Do a POST to persist changes in DB
        // Ref: https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples
        // ==============

        if (URL === '') {
            return EMPTY;
        }
        if (!attachJwtToken)
            attachJwtToken = false;

        // ==== Set Headers
        let headers: any;  // Headers;
        if (!attachJwtToken) {
            headers        = { 'Content-Type' : 'application/json' };  // new Headers({ 'Content-Type' : 'application/json' });
        }
        else
        {
            headers        = this.getAuthHeaders().toPromise();
            if (!headers) {
                return handleError('You must be authenticated to perform this operation!');
            }
        }
        // const options   = new RequestOptions({ withCredentials: true, headers: headers });

        // ==== POST
        return this.http.post<T>(URL, modelInBody, { withCredentials: true, headers: headers });
    }

    read(URL: string, attachJwtToken: boolean): Observable<any>
    {
        // ==============
        // GET data from DB
        // Ref: https://jasonwatmore.com/post/2019/09/06/angular-http-get-request-examples
        // ==============

        if (URL === '') {
            return EMPTY;
        }

        // ==== Set Headers
        let headers: any;  // Headers;
        if (!attachJwtToken) {
            headers   = { 'Content-Type' : 'application/json' };
        }
        else
        {
            headers   = this.getAuthHeaders().toPromise();
            if (!headers) {
                return handleError('You must be authenticated to perform this operation!');
            }
        }

        // ==== GET
        return this.http.get<any>(URL, { withCredentials: true, headers: headers });
    }

    update<T>(URL: string, modelInBody: T): Observable<T>
    {
        // ==============
        // Do a PUT to persist changes in DB
        // ==============

        if (URL === '') {
            return EMPTY;
        }

        // ==== Set Headers
        // let headers = this.getAuthHeaders().toPromise();
        // if (!headers)
        // {
        //     if (consts.isProduction)
        //     {
        //         return handleError('You must be authenticated to perform this operation!');
        //     }
        //     // else {
        //     //     headers = { 'Content-Type' : 'application/json' };
        //     // }
        //     // const options = new RequestOptions({ withCredentials: true, headers: headers });
        // }

        // ==== PUT
        return this.http.put<T>(URL, modelInBody, { withCredentials: true, headers: { 'Content-Type' : 'application/json' } });  // headers
    }

    delete(URL: string): Observable<any>
    {
        // ==============
        // Issue a DELETE request to remove resource from DB
        // ==============

        if (URL === '') {
            return handleError('Empty Delete URL');
        }

        // ==== Set Headers
        // const headers = this.getAuthHeaders().toPromise();
        // if (!headers) {
        //     return handleError('You must be authenticated to perform this operation!');
        // }
        // // const options = new RequestOptions({ withCredentials: true, headers: headers });

        // ==== DELETE
        return this.http.delete<any>(URL, { withCredentials: true, headers: { 'Content-Type' : 'application/json' } });  // headers
    }

    private getAuthHeaders(): any
    {
        // const authToken = "";  // this.auth.getAccessToken();

        return "";

        /*
        this.auth.getAccessToken().subscribe(
        {
            next: (token: any) => {
                // this.token = "Bearer " + token;
                // this.isError = false;

                if (token)
                {
                    // Set Headers
                    return { 'Content-Type' : 'application/json' , 'Authorization': `Bearer ${token}`};
                }
                else {
                    return null;
                }
            },
            error: (error: any) => {
                // this.isError = true;
                return null;
            }
        });  // */
    }
}