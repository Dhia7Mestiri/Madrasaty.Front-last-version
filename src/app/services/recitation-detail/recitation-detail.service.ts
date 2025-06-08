import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecitationDetail } from '@models/recitation-detail';
import { Observable } from 'rxjs';

import * as consts from '@consts/url.consts';

@Injectable({
  providedIn: 'root'
})
export class RecitationDetailService {
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };
  constructor(private http: HttpClient) { }

  getRecitationDetail(Id: number): Observable<RecitationDetail> {
    return this.http.get<RecitationDetail>(consts.RECITATION_DETAIL_URL+"/" + Id, this.httpOptions)
  }
  getRecitationDetailByStudentAndRecitation(studentId: string, recitationId: number): Observable<RecitationDetail> {
    return this.http.get<RecitationDetail>(consts.RECITATION_DETAIL_URL + "?studentId=" + studentId + "&recitationId=" + recitationId, this.httpOptions)
  }
  createRecitationDetail(recitationDetail:RecitationDetail): Observable<RecitationDetail>{
    return this.http.post<RecitationDetail>(consts.RECITATION_DETAIL_URL,recitationDetail,this.httpOptions)
  }
  updateRecitation(recitationDetail:RecitationDetail){
    return this.http.put<RecitationDetail>(consts.RECITATION_DETAIL_URL+recitationDetail.Id,recitationDetail, this.httpOptions)
  }
  abc(recitationDetail:RecitationDetail): Observable<RecitationDetail[]> {
    return this.http.post<RecitationDetail[]>(consts.RECITATION_DETAIL_URL+"/GetAllByIdStudentAndRecitation",recitationDetail, this.httpOptions)
  }



}

