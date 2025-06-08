import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable             } from '@angular/core';
import { getAccessToken         } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class ExcelUploadService
{
    httpOptions: any;

    constructor(private http: HttpClient)
    {
        this.httpOptions = getAccessToken();
    }

    UploadExcel(formData: FormData, urlController)
    {
        let params = new HttpParams();
        // let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accessToken, });

        const options = { headers: this.httpOptions, params: params, reportProgress: true };
        return this.http.post(consts.API_URL + urlController, formData, options)
    }
}