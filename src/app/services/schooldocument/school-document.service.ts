import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SchoolDocument } from '@models/SchoolDocument';

import * as consts from '@consts/url.consts';

@Injectable({
  providedIn: 'root'
})
export class SchoolDocumentService
{
  private schoolDocumentUrl = consts.SCHOOL_DOCUMENTS_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  schoolDocumentIdSource = new  BehaviorSubject<number>(0);
  schoolDocumentIdData: any;
  constructor(private http: HttpClient) {
    this.schoolDocumentIdData= this.schoolDocumentIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getSchoolDocuments(schoolId,pagenumber): Observable<any> {
    return this.http.get<any>(this.schoolDocumentUrl+ "?schoolId="+schoolId+ "&_pageNumber="+pagenumber,this.httpOptions)
  }
  getSchoolDocument(id): Observable<SchoolDocument> {
    if (id === -1) {
      return of(this.initializeSchoolDocument());
    }
    return this.http.get<SchoolDocument>(this.schoolDocumentUrl+id,this.httpOptions)
  }

  getFiltredSchoolDocument(roles): Observable<SchoolDocument[]> {
    return this.http.get<SchoolDocument[]>(this.schoolDocumentUrl+"DocumentByRoles/"+roles,this.httpOptions)
  }

  
/*   UploadSchoolDocument(formData: FormData): Observable<any>{
    let params = new HttpParams();
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken,});
    headers.append('Content-Type', 'multipart/form-data' );
    const options = {headers: headers,params: params,reportProgress: true};
   return this.http.post(consts.MOUTOUN_DETAIL_URL + "/upload", formData,options)
  }
 */
  GetSchoolDocPath(document: string) {
    var documentPath = consts.SCHOOL_DOCUMENTS_PATH;
    if (document != "" && document != null && document!="0") {
      documentPath = documentPath + document ;
   
    }
    return documentPath;
  }
  createSchoolDocument(document): Observable<SchoolDocument> {
    return this.http.post<SchoolDocument>(this.schoolDocumentUrl, document,this.httpOptions)
  }

  updateSchoolDocument(schoolDocument: SchoolDocument): Observable<SchoolDocument> {
    return this.http.put<SchoolDocument>(this.schoolDocumentUrl+schoolDocument.Id, schoolDocument, this.httpOptions)
  }
  deleteSchoolDocument(id:number): Observable<SchoolDocument> {
    return this.http.delete<SchoolDocument>(this.schoolDocumentUrl+id, this.httpOptions)
  }
  changeSchoolDocument(SchoolDocumentId: number){
    this.schoolDocumentIdSource.next(SchoolDocumentId);
}
  private initializeSchoolDocument(): SchoolDocument {
    return {
      Id: 0,
      Name:"",
      SchoolId: null,
      Description:null,
      DocumentUrl: null    
    }
  }
}
