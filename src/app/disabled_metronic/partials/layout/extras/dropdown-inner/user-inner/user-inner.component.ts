import { LanguageFlag       } from '@interfaces/language-flag';
import { languages          } from '@consts/language.consts';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//import { AuthService, UserType } from '../../../../../../components/auth';
import { UserService } from 'src/app/services/user.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { UserType } from 'src/app/models/UserType';
import { TranslationService } from '@modules/i18n/translation.service';

@Component({
    selector   : 'app-user-inner',
    templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy
{
    currentUserId: any;
    PhotoPath: string;
    FullName: string;
    FirstName: string;
    LastName: string;
    Profession: string;
    currentMemberStatutId: number;
    anneeScolaireDescription: string;
    status: number

    language: LanguageFlag;
    @HostBinding('class')
    class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
    selectedCountry: string;

    memberStatusData
    //user$: Observable<UserType>;
    data


    private unsubscribe: Subscription[] = [];
    langs = languages;




  
  //user$: Observable<UserType>;
  
  MemberStatus


    countries: any[] = [
        { name: 'australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
    ];

  constructor(

    private translationService: TranslationService,
     private userService: UserService,
     private memberService: MembersListService,
     private schoolYearService: SchoolyearService,
 
  ) {

   
  }

  ngOnInit(): void {

    this.MemberStatus =Object.keys(UserType).map(key => ({ label:key , value:UserType[key]  }));
    //this.setLanguage(this.translationService.getSelectedLanguage());   
  this.currentUserId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['id'];

        this.getmemeber()
        this.memberService.Refreshrequired.subscribe(data => {
            console.log(data)
            // this.getmemeber() 
        });





//this.getSchoolYear()
this.schoolYearService.Refreshrequired.subscribe(data=>{
  this.anneeScolaireDescription = data.Description
}); 


  }

    logout()
    {
        this.userService.logOut();
    }


getmemeber(){
  this.memberService.getMember(this.currentUserId).subscribe((member)=>
   {
    console.log(member)
     this.data=member
      this.PhotoPath = this.memberService.GetMemberPhotoPath(this.data.PhotoPath), 
        this.status= this.MemberStatus[member.Status].label   
    },

        );
    }




 getSchoolYear(){
  this.schoolYearService.getActifSchoolYear().subscribe({
    next: (resp) => this.anneeScolaireDescription = resp.Name,
    error: (err) => console.log("erreur")  }

  );
 
 }
 selectLanguage(lang: string) {
  this.translationService.setLanguage(lang);
  this.setLanguage(lang);
  document.location.reload();
}

    setLanguage(lang: string)
    {
        this.langs.forEach((language: LanguageFlag) => {
            if (language.lang === lang) {
                language.active = true;
                this.language = language;
            } else {
                language.active = false;
            }
        });
    }

    ngOnDestroy()
    {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}