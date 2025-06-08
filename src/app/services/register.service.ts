import { Injectable              } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable              } from "rxjs";
import { Member                  } from "@models/member";
import { map, tap                     } from "rxjs/operators";

import * as consts from '@consts/url.consts';

@Injectable()
export class RegisterService
{
  memberdata: string;
  listAdmins: string[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "",
    }),
  };
  http: any;

  constructor(private httpclient: HttpClient) {}
  public getCountries() {
    return this.httpclient.get("../../assets/files/countries.json");
  }
  public getSchools() {
    return this.httpclient.get<any>(consts.API_URL + "Schools")  }
  public getMemberStatus() {
    return this.httpclient.get(consts.API_URL + "MemberStatus");
  }

  public getAdmins(id) {
    return this.httpclient.get<string[]>(
      consts.API_URL + "Members/GetMembersBySchoolId/" + id,
      this.httpOptions
    );
  }

  public RegisterUser(formData) {
    formData.login = formData.email;
    formData.PhotoPath = "Unknown.jpg";
    console.log(formData)
    return this.httpclient.post(
      consts.API_URL + "Account/RegisterMember",
      formData,
      this.httpOptions
    );
  }

  SetPassword(passwordmodel) {
    console.log(passwordmodel)
    return this.httpclient.post(
      consts.API_URL + "Account/PasswordRecovery",
      passwordmodel,
      this.httpOptions
    );
  }

  ConfirmEmail(email) {     
    return this.httpclient.post(consts.API_URL +"Account/ConfirmEmail",email,this.httpOptions);
  }

  ChangePassword(passwordmodel) {
    return this.httpclient.put(
      consts.API_URL + "Members/PutMemberLogins",
      passwordmodel,
      this.httpOptions
    );
  }
  editPassword(aux): Observable<Member> {
    let MemberModel = {
      Password: aux.Password,
      Id: aux.Id,
    };
    return this.httpclient
      .put<Member>(consts.API_URL + "Members/PutMemberLogins", MemberModel )
      .pipe(tap(() => console.log("updateMember: ")));
  }
}
