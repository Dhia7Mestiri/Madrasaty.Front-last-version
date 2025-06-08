import { Component, OnInit  } from '@angular/core';

import { MembersListService } from '@services/members/members-list.service';
import { SchoolyearService  } from '@services/schoolyear/schoolyear.service';
import { LayoutService      } from '../../core/layout.service';

import { Member             } from '@models/member';

@Component({
    selector   : 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls  : ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit
{
    toolbarButtonMarginClass = 'ms-1 ms-lg-3';
    toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
    toolbarButtonIconSizeClass = 'svg-icon-1';
    headerLeft: string = 'menu';
    currentMemberId;
    memberData = new Member()
    PhotoPath
    src

    constructor(private schoolYearService: SchoolyearService, private layout: LayoutService, public memberService: MembersListService) { }

    ngOnInit(): void {

    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['id'];
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.getMember() 
    this.schoolYearService.Refreshrequired.subscribe(data=>{
    console.log(data)
    }); 
    
    this.memberService.Refreshrequired.subscribe(data=>{
      console.log(data)
      }); 
  }
   getMember() {
    this.memberService.getMember(this.currentMemberId)
    .subscribe(data=>{      
     this.memberData=data;   
    
     this.src=this.memberService.GetMemberPhotoPath(this.memberData.Photo)
        this.currentMemberId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
        this.headerLeft = this.layout.getProp('header.left') as string;
        this.getMember()
        this.schoolYearService.Refreshrequired.subscribe(data => {
            console.log(data)
        });

        this.memberService.Refreshrequired.subscribe(data => {
            console.log(data)
        });
    })

}
}

interface LanguageFlag {
    lang: string;
    name: string;
    flag: string;
    active?: boolean;
}

const languages = [
    {
        lang: 'en',
        name: 'English',
        flag: './assets/media/flags/united-states.svg',
    },
    {
        lang: 'zh',
        name: 'Mandarin',
        flag: './assets/media/flags/china.svg',
    },
    {
        lang: 'es',
        name: 'Spanish',
        flag: './assets/media/flags/spain.svg',
    },
    {
        lang: 'ja',
        name: 'Japanese',
        flag: './assets/media/flags/japan.svg',
    },
    {
        lang: 'de',
        name: 'German',
        flag: './assets/media/flags/germany.svg',
    },
    {
        lang: 'fr',
        name: 'French',
        flag: './assets/media/flags/france.svg',
    },
];