import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';

import { Member         } from '@models/member';
import { MemberFilter   } from '@models/member-filter';
import { MemberStatus   } from '@models/member-status';

import { getAccessToken } from '@functions/access-token';
import { getCurrentUser } from '@functions/current-user';

import * as consts from '@consts/url.consts';

@Injectable({
    providedIn: 'root'
})
// <<<<<<< HEAD
export class MembersListService {
  private memberUrl = consts.API_URL + "Members";
  private user = getCurrentUser();  // JSON.parse(localStorage.getItem("currentUser"))["user"];
  private IdUser = this.user?.id ?? 0;  // = JSON.parse(this.User).id;

  private _refreshrequired$ = new Subject<any>();
  //_refreshrequired: Subject<object> = new Subject();

  httpOptions = getAccessToken();
  memberIdSource = new BehaviorSubject<number>(0);

  memberIdData: any;

  currentUser: Member;

  memberForm: FormGroup;
  profileForm :FormGroup
  constructor(private httpclient: HttpClient,	private formBuilder: FormBuilder) {
    this.memberIdData = this.memberIdSource.asObservable();
  }
    
  createProfileForm(){
  this.profileForm = this.formBuilder.group({
    LastName:['', Validators.required],
    FirstName:['', Validators.required],
    Female:['', Validators.required],
    SkypeId:['', Validators.required],
    ParentEmail:['',],
    PhoneNumber:'',
    BirthDate:['', Validators.required],
    Street:['', Validators.required],
    ZipCode:['', Validators.required],
    City:['', Validators.required],
    Country:['', Validators.required],
    PhotoBytes:'',
    });
    return  this.profileForm
  }
 

  createMembersForm(){
    this.memberForm = this.formBuilder.group({
      Email: [""],
      Id: ["" ],
      Password: [""],
      LastName: [""],
      FirstName: [""],
      Status: [""],
      State:[""],
      SkypeId: [""],
      Profession: [""],
      CreatedOn: [""],
      ZipCode: [""],
      Street: [""],
      City: [""],
      SchoolId: ["", ],
      Female: [""],
      Country: [""],
      BirthDate:[ ""],
      PhotoPath: ["", ],
      PhoneNumber:[ ""],
      Login: [""],
    });
  
      return  this.memberForm
}
  get Refreshrequired() : Observable<any> {

    return this._refreshrequired$.asObservable() ;
  }

  setRefreshrequired(obj:any) { 

    this._refreshrequired$.next(obj); 
  }
   getMemberStatus() {
    return this.httpclient.get(consts.API_URL + "MemberStatus");
  }
   getMemberStates() {
    return this.httpclient.get(consts.API_URL + "MemberStates");
  }

  getMembersCount(): Observable<number> {
    return this.httpclient.get<number>(this.memberUrl+"/CountOfMembers" ,this.httpOptions)
  }

   getTeachersBySchoolId(schoolId): Observable<any[]>  {
     return this.httpclient.get<any[]>( this.memberUrl + "/TeachersBySchoolId/"+schoolId, this.httpOptions);
  }
  getStudentsBySchoolId(schoolId): Observable<any[]>  {
    return this.httpclient.get<any[]>( this.memberUrl + "/StudentsBySchoolId/"+schoolId, this.httpOptions);
 }

 public getTeachers() {
  return this.httpclient.get(
    consts.API_URL + "Members/Teachers",
    this.httpOptions
  );
}

  getMembers(SchoolId,pagenumber,search,role): Observable<Member[]> {

    return this.httpclient.get<Member[]>(this.memberUrl+"?SchoolId="+SchoolId+"&_pageNumber="+pagenumber+"&search="+search+"&role="+role, this.httpOptions)
  }
  // public getCountries() {
  //   return this.httpclient.get("../../../assets/files/countries.json");
  // }
  createMember(member: Member): Observable<Member> {
    member.Login = member.Login;
    member.Photo = "Unknown.jpg";
    member.UserName = member.Login;
    member.Id = '00000000-0000-0000-0000-000000000000'
    let MemberModel = {
      Member: member,
      Password: member.Password,
      PhotoBytes: ''
    }
    console.log(member)
    return this.httpclient.post<Member>(this.memberUrl, MemberModel, this.httpOptions)
  }
  GetMemberById() {
    return this.httpclient.get<Member>(consts.API_URL + "Members/" + this.IdUser, this.httpOptions)

  }
  getCurrentMember(id): Observable<Member> {
    return (this.httpclient.get<Member>(consts.API_URL + "Members/" + id, this.httpOptions));

  }
  public getMemberStatusById(id: number): Observable<MemberStatus> {
    return this.httpclient.get<MemberStatus>(consts.API_URL + "MemberStatus/" + id, this.httpOptions);
  }

  updateMember(profileModel: any): Observable<Member> {
 /*    console.log(member)
    member.PhotoPath = "Unknown.jpg"; */
    // member.SchoolId=this.GetSchoolId();
/*     let MemberModel = {
      Member: member,
      Password: member.Password,
      PhotoBytes:''
    } */
    return this.httpclient.put<Member>(this.memberUrl+ "/" +profileModel.Id, profileModel, this.httpOptions)
  }


  changeMemberId(memberId: number) {
    this.memberIdSource.next(memberId);
  }
  getMember(id): Observable<Member> {
    if (id === -1) {
      return of(this.initializeMember());
    }
    return this.httpclient.get<Member>(consts.API_URL + "Members/" + id, this.httpOptions)
  }

  getStudent(id): Observable<any> {
    return this.httpclient.get<any>(consts.API_URL + "Members/Students/" + id, this.httpOptions)
  }


  GetStudents(levelId: number): Observable<MemberFilter[]> {
    return this.httpclient.get<MemberFilter[]>(consts.MEMBER_URL + '/Students/' + levelId, this.httpOptions)
  }

  private initializeMember(): Member {
    return {
      Login: '',
      FirstName: '',
      LastName: '',
      Female: '',
      SkypeId: '',
      ParentEmail:'',
      PhoneNumber: '',
      CreatedOn: new Date(),
      BirthDate: new Date(),
      Street: '',
      ZipCode: '',
      City: '',
      Country: '',
      FullName:'',
      Photo: '',
      Id: '00000000-0000-0000-0000-000000000000',
      Email: '',
      Password: '',
      SchoolId: 0,
      Status: 0,
      State:1,
      UserName: ''
    };
  }
  deleteMember(id: number): Observable<Member> {
      return this.httpclient.delete<Member>(consts.API_URL + "Members/" + id, this.httpOptions)
  }

  // GetMemberPhotoPath(photo: string) {
   
  //   var photoPath = consts.MEMBER_PHOTO_PATH;
  //   if (photo != "" && photo != null) {
  //     photoPath = photoPath + photo ;
  //     return photoPath;
  //   }
// =======
// export class MembersListService
// {
//     private user: any;  // JSON.parse(localStorage.getItem("currentUser"))["user"];
//     private userId = 0;
//     memberData;

//     private _refreshrequired$ = new Subject<any>();
//     //_refreshrequired: Subject<object> = new Subject();

//     httpOptions: any;
//     memberIdSource = new BehaviorSubject<number>(0);

//     memberIdData: any;
//     connectedUserData

//     currentUser: Member;

//     memberForm: FormGroup;
//     profileForm: FormGroup
//     constructor(private httpclient: HttpClient, private formBuilder: FormBuilder)
//     {
//         this.memberIdData = this.memberIdSource.asObservable();
//         this.httpOptions  = getAccessToken();
//         this.user         = getCurrentUser();
//         this.userId       = this.user ? JSON.parse(this.user['user']).Id : 0;
//     }

//     createProfileForm() {
//         this.profileForm = this.formBuilder.group({
//             LastName: ['', Validators.required],
//             FirstName: ['', Validators.required],
//             Gender: ['', Validators.required],
//             SkypeId: ['', Validators.required],
//             ParentEmail: ['',],
//             PhoneNumber: '',
//             CreatedOn: ['', Validators.required],
//             BirthDate: ['', Validators.required],
//             Profession: ['', Validators.required],
//             Street: ['', Validators.required],
//             ZipCode: ['', Validators.required],
//             City: ['', Validators.required],
//             Country: ['', Validators.required],
//             Photo: '',
//         });

//         return this.profileForm;
//     }

//     createMembersForm()
//     {
//         this.memberForm = this.formBuilder.group({
//             Email: [""],
//             Id: [""],
//             Password: [""],
//             LastName: [""],
//             FirstName: [""],
//             MemberStatusId: [""],
//             MemberStateId: [""],
//             SkypeId: [""],
//             Profession: [""],
//             CreatedOn: [""],
//             ZipCode: [""],
//             Street: [""],
//             City: [""],
//             SchoolId: ["",],
//             Female: [""],
//             Country: [""],
//             BirthDate: [""],
//             Photo: ["",],
//             PhoneNumber: [""],
//             Login: [""],
//         });

//         return this.memberForm
//     }

//     get Refreshrequired(): Observable<any>
//     {
//         return this._refreshrequired$.asObservable();
//     }

//     setRefreshrequired(obj: any)
//     {
//         this._refreshrequired$.next(obj);
//     }
//     getMemberStatus(): Observable<number>
//     {
//         return this.httpclient.get<number>(consts.API_URL + "MemberStatus", { withCredentials: true, headers: this.httpOptions });
//     }

//     getMemberStates()
//     {
//         return this.httpclient.get(consts.API_URL + "MemberStates", { withCredentials: true, headers: this.httpOptions });
// >>>>>>> c1a51d3310dda2bb2598a4cce7ea289806c31094
//     }

    // getMembersCount(): Observable<number>
    // {
    //     return this.httpclient.get<number>(consts.API_URL + "Members/CountOfMembers", { withCredentials: true, headers: this.httpOptions });
    // }

    // getTeachersBySchoolId(schoolId): Observable<any[]>
    // {
    //     return this.httpclient.get<any[]>(consts.API_URL + "Members/TeachersBySchoolId/" + schoolId, { withCredentials: true, headers: this.httpOptions });
    // }

    // getStudentsBySchoolId(schoolId): Observable<any[]>
    // {
    //     return this.httpclient.get<any[]>(consts.API_URL + "Members/StudentsBySchoolId/" + schoolId, { withCredentials: true, headers: this.httpOptions });
    // }

    // public getTeachers() {
    //     return this.httpclient.get(
    //         consts.API_URL + "Members/Teachers",
    //         { withCredentials: true, headers: this.httpOptions }
    //     );
    // }

    // getMembers(pagenumber, search, role): Observable<Member[]> {

    //     return this.httpclient.get<Member[]>(consts.API_URL + "Members?_pageNumber=" + pagenumber + "&search=" + search + "&role=" + role, { withCredentials: true, headers: this.httpOptions })
    // }
    public getCountries() : Observable<any[]> {
        return this.httpclient.get<any[]>("assets/files/countries.json");
    }
    // createMember(member: Member): Observable<Member> {
    //     member.Login = member.Login;
    //     member.PhotoPath = "Unknown.jpg";
    //     member.UserName = member.Login;
    //     member.Id = '00000000-0000-0000-0000-000000000000'
    //     let MemberModel = {
    //         Member: member,
    //         Password: member.Password,
    //         Photo: ''
    //     }
    //     console.log(member)
    //     return this.httpclient.post<Member>(consts.API_URL + "Members", MemberModel, { withCredentials: true, headers: this.httpOptions })
    // }

    // GetMemberById()
    // {
    //     return this.httpclient.get<Member>(consts.API_URL + "Members/" + this.userId, { withCredentials: true, headers: this.httpOptions })

    // }
    // getCurrentMember(id): Observable<Member>
    // {
    //     return (this.httpclient.get<Member>(consts.API_URL + "Members/" + id, { withCredentials: true, headers: this.httpOptions }));
    // }

    // public getMemberStatusById(id: number): Observable<MemberStatus>
    // {
    //     return this.httpclient.get<MemberStatus>(consts.API_URL + "MemberStatus/" + id, { withCredentials: true, headers: this.httpOptions });
    // }

    // updateMember(profileModel: any): Observable<Member>
    // {
    //     /*    console.log(member)
    //        member.PhotoPath = "Unknown.jpg"; */
    //     // member.SchoolId=this.GetSchoolId();
    //     /*     let MemberModel = {
    //           Member: member,
    //           Password: member.Password,
    //           Photo:''
    //         } */
    //     return this.httpclient.put<Member>(consts.API_URL + "Members/" + profileModel.Member.Id, profileModel, { withCredentials: true, headers: this.httpOptions })
    // }


    // changeMemberId(memberId: number)
    // {
    //     this.memberIdSource.next(memberId);
    // }

    // getMember(id): Observable<Member>
    // {
    //     if (id === -1) {
    //         return of(this.initializeMember());
    //     }
    //     return this.httpclient.get<Member>(consts.API_URL + "Members/" + id, { withCredentials: true, headers: this.httpOptions })
    // }

    // getStudent(id): Observable<any>
    // {
    //     return this.httpclient.get<any>(consts.API_URL + "Members/Students/" + id, { withCredentials: true, headers: this.httpOptions })
    // }


    // GetStudents(levelId: number): Observable<MemberFilter[]>
    // {
    //     return this.httpclient.get<MemberFilter[]>(consts.MEMBER_URL + '/Students/' + levelId, { withCredentials: true, headers: this.httpOptions })
    // }

    // private initializeMember(): Member
    // {
    //     return {
    //         Login: '',
    //         FirstName: '',
    //         LastName: '',
    //         Female: '',
    //         SkypeId: '',
    //         ParentEmail: '',
    //         PhoneNumber: '',
    //         CreatedOn: new Date(),
    //         BirthDate: new Date(),
    //         // Profession: '',
    //         Street: '',
    //         ZipCode: '',
    //         City: '',
    //         Country: '',
    //         FullName: '',
    //         Photo: '',
    //         Id: '00000000-0000-0000-0000-000000000000',
    //         Email: '',
    //         Password: '',
    //         SchoolId: 0,
    //         Status: 0,
    //         State: 1,
    //         UserName: ''
    //     };
    // }
    // deleteMember(id: number): Observable<Member>
    // {
    //     return this.httpclient.delete<Member>(consts.API_URL + "Members/" + id, { withCredentials: true, headers: this.httpOptions })
    // }

    GetMemberPhotoPath(photo: string)
    {
        var photoPath = consts.MEMBER_PHOTO_PATH;
        if (photo != "" && photo != null) {
            photoPath = photoPath + photo;
        }
        else {
            photoPath = photoPath + "unknown.jpg";
        }
        return photoPath;
    }

    // updateProfile(profileModel): Observable<Member>
    // {
    //     return this.httpclient.put<Member>(consts.API_URL + "Members/" + profileModel.Member.Id, profileModel, { withCredentials: true, headers: this.httpOptions })/* .pipe(
    //     tap((obj) => {
    //         this._refreshrequired$.next(obj); 
    //     }))   */
    // }

    // validateProfile(profileModel): Observable<Member>
    // {
    //     // active profile
    //     profileModel.MemberStatusId = 4;
    //     return this.httpclient.put<Member>(consts.API_URL + "Members/" + profileModel.Member.Id, profileModel, { withCredentials: true, headers: this.httpOptions })
    // }

    // MemberById(id): Observable<Member>
    // {
    //     return this.httpclient.get<Member>(consts.API_URL + "Members/" + id, { withCredentials: true, headers: this.httpOptions })
    // }

    // MembersBySchoolId(SchoolId): Observable<Member>
    // {
    //     return this.httpclient.get<Member>(consts.API_URL + "Members/MembersBySchoolId/" + SchoolId, { withCredentials: true, headers: this.httpOptions })
    // }

    // UploadExcel(formData: FormData)
    // {
    //     let params = new HttpParams();
    //     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"], });
    //     const options = { headers: headers, params: params, reportProgress: true };
    //     return this.httpclient.post(consts.API_URL + '/Members/UploadExcel', formData, options)
    // }

  updateProfile(profileModel): Observable<Member> {
    return this.httpclient.put<Member>(consts.API_URL + "Members/" + profileModel.Id, profileModel, this.httpOptions);
  }

  validateProfile(profileModel): Observable<Member> {
    // active profile
    profileModel.MemberStatusId = 4;
    return this.httpclient.put<Member>(consts.API_URL + "Members/" + profileModel.Member.Id, profileModel, this.httpOptions)
  }

  MemberById(id): Observable<Member> {
    return this.httpclient.get<Member>(consts.API_URL + "Members/" + id, this.httpOptions)
  }

  MembersBySchoolId(SchoolId): Observable<Member> {
    return this.httpclient.get<Member>(consts.API_URL + "Members/MembersBySchoolId/" + SchoolId, this.httpOptions)
  }



  UploadExcel(formData: FormData) {
    let params = new HttpParams();
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"],});
    const options = {headers: headers,params: params,reportProgress: true};
   return this.httpclient.post(consts.API_URL + '/Members/UploadExcel', formData,options)
  }
}
