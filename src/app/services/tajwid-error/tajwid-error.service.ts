import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
export class TajwidErrorService
{
    httpOptions: any;

    constructor(private http: HttpClient)
    { }

    /*   getRootTajwidErrors() {
        return this.http.get(consts.TAJWID_ERROR_URL+"RootItems", this.httpOptions)
    
      }
      getTajwidErrors_() {
        return this.http.get(consts.TAJWID_ERROR_URL+"All", this.httpOptions)
    
      } */
    /*   getTajwidError(Id:number):Observable<TajwidError>{
        if (Id === -1) {
          return of(this.initializeTajwidError());
        }
        return this.http.get<TajwidError>(consts.TAJWID_ERROR_URL+Id, this.httpOptions)
    
      } */

    public getTajwidErrorsforTree(): Observable<any>
    {
        return this.http.get("assets/files/TajwidErrorsforTree.json");
    }

    public getTajwidErrors(): Observable<any>
    {
        return this.http.get("assets/files/TajwidError.json");
    }

    /* initializeTajwidError(): TajwidError {
      return {
        Id: 0,
       Wording:'',
       ParentId:0,
       children:[]
      };
    }
    updateTajwidErrorLocation(e): Observable<any> {
  
      let model = {
        'Id': e.item.Id,
        'Wording': e.item.Wording,
        'ParentId': e.item.ParentId,
        'children': e.item.children
      }
      return this.http.put(consts.TAJWID_ERROR_URL+model.Id,model,this.httpOptions)
    }
    updateTajwidError(model): Observable<any> {
      return this.http.put(consts.TAJWID_ERROR_URL+model.Id,model,this.httpOptions)
    }
  
    deleteTajwidError(Id): Observable<any> {
      return this.http.delete(consts.TAJWID_ERROR_URL+Id,this.httpOptions)
    }
    createTajwidError(e): Observable<any> {
  
      let model = {
        'Wording': e.Wording,
      }
      return this.http.post(consts.TAJWID_ERROR_URL,model,this.httpOptions)
    } */
}