import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '@models/member';
import { Observable, BehaviorSubject } from 'rxjs';

import { RecitationSessionModel } from '@models/recitation-session-model';

import * as consts from '@consts/url.consts';

@Injectable({
  providedIn: 'root'
})
export class SessionParticipantService {
  private url = consts.STUDENTRECITATION_URL;
  private sessionUrl = consts.SESSION_URL;
  sessionId;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };

  sessionIdSource = new BehaviorSubject<number>(0);
  sessionIdData: any;
  constructor(private http: HttpClient) {
    this.sessionIdData = this.sessionIdSource.asObservable();
  }


  getSession(id): Observable<RecitationSessionModel> {

    return this.http.get<RecitationSessionModel>(this.sessionUrl+id,this.httpOptions)
  }

  GetStudents(sessionId): Observable<Member[]> {
    return this.http.get<Member[]>(this.url + sessionId, this.httpOptions);
  }

  updateOrder(id,item){
  return this.http.put<any[]>(this.url + id,item, this.httpOptions);
 
  }


  GetAllStartTime(sessionId): Observable<any[]> {
    return this.http.get<any[]>(this.url+"AllStartTime/" + sessionId, this.httpOptions);
  }

}
