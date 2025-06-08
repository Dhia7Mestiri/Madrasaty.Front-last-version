import { Injectable             } from '@angular/core';
import { Observable, of,
         BehaviorSubject        } from 'rxjs';
import { tap                    } from 'rxjs/operators';
import { HttpClient             } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { School                 } from '@models/school';
import { getAccessToken         } from '@functions/access-token';

import * as consts from '@consts/url.consts';

@Injectable()
export class SchoolService
{
    httpOptions: any;
    schoolForm: FormGroup;
    schoolIdSource = new BehaviorSubject<number>(0);
    schoolIdData: Observable<number>;

    constructor(private http: HttpClient, private formBuilder: FormBuilder)
    {
        this.httpOptions  = getAccessToken();
        this.schoolIdData = this.schoolIdSource.asObservable();
    }

    createSchoolForm()
    {
        this.schoolForm = this.formBuilder.group({
          Name: [""],
          Street: [""],
          ZipCode: [""],
          City: [""],
          Country: [""],
          Photo: [""],
          Siret: [""],
          CodeTVA: [""],
           SocietyName: [''],     // ✅ à ajouter
  SiretCode: [''],       // ✅ à ajouter
  NumTVA: ['']           // ✅ à ajouter
          
        });

        return this.schoolForm
    }


    public getCountries()
    {
        return this.http.get(consts.ROOT_URL + "assets/files/countries.json");
    }

    getCountryTest()
    {
        return this.http.get(consts.ROOT_URL + "assets/files/countries.json");
    }

    getSchoolsByPage(pagenumber: number, search: string): Observable<School[]>
    {
        return this.http.get<School[]>(
            consts.SCHOOL_URL + "?_pageNumber=" + pagenumber + "&search=" + search,
            { withCredentials: true, headers: this.httpOptions }
        );
    }


  changeSchoolId(schoolId: number){
    this.schoolIdSource.next(schoolId);
  }


    getSchools(): Observable<School[]>
    {
        return this.http.get<School[]>(consts.SCHOOL_URL, { withCredentials: true, headers: this.httpOptions });
    }

    getSchool(id: number): Observable<School>
    {
        if (id === -1)
        {
            return of(this.initializeSchool());
        }

        return this.http.get<School>(consts.SCHOOL_URL + id, { withCredentials: true, headers: this.httpOptions });
    }

    GetSchoolPhotoPath(photo: string)
    {
        var photoPath = consts.SCHOOL_PHOTO_PATH;
        if (photo != "" && photo != null && photo != "0.jpg" && photo != "0")
        {
            photoPath = photoPath + photo + '?' + new Date().getTime();
        }
        else {
            photoPath = photoPath + "madrasaty_logo.jpg";
        }

        return photoPath;
    }

    createSchool(school): Observable<School>
    {
        return this.http.post<School>(consts.SCHOOL_URL, school, { withCredentials: true, headers: this.httpOptions });
    }

    updateSchool(school): Observable<School>
    {
        return this.http.put<School>(consts.SCHOOL_URL + school.School.Id, school, { withCredentials: true, headers: this.httpOptions });
    }

    deleteSchool(id: number): Observable<School>
    {
        return this.http.delete<School>(consts.SCHOOL_URL + id, { withCredentials: true, headers: this.httpOptions })
            .pipe(
                tap(data => console.log('deleteSchool: ' + id),
                    error => console.log(error))
            );
    }

    private initializeSchool(): School {
      return {
        Id: 0,
        Name: '',
        Street: '',
        ZipCode: '',
        City: '',
        Country: '',
        Photo: '',
        Siret:'',
        CodeTVA:'',
      };
    }  
}