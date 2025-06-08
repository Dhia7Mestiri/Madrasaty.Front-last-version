
import { Component, OnInit  } from '@angular/core';
import { FormGroup          } from '@angular/forms';

import { MembersListService } from '@services/members/members-list.service';
import { Member             } from '@models/member';
import { SelectItem } from 'primeng/api';
import { UserType } from 'src/app/models/UserType';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  memberData=new Member()
  PhotoPath
  src
  profile
  profileForm:FormGroup;
  value
  MemberStatus: SelectItem[]
  currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['id']; 
  constructor(public memberService: MembersListService) {  

  }

  ngOnInit(): void {

    this.profileForm = this.memberService.createProfileForm()
    this.MemberStatus =Object.keys(UserType).map(key => ({ label:key , value:UserType[key]  }));
  this.getMember() 
    this.memberService.Refreshrequired.subscribe(data=>{
   this.memberData=data.Model
    this.src=data.Photo
 this.getMember() 
  });   
  }
   getMember() {
    this.memberService.getMember(this.currentMemberId)
    .subscribe(data=>{    
     this.memberData=data;       
     this.src=this.memberService.GetMemberPhotoPath(this.memberData.Photo) 
     this.displayProfile(this.memberData)
    });
  } 
  displayProfile(member: any): void {
 
    this.profile = member;   
    this.profileForm.patchValue({
      LastName: this.profile.LastName,
      FirstName: this.profile.FirstName,
      Gender: this.profile.Gender,
      SkypeId: this.profile.SkypeId,
      PhoneNumber: this.profile.PhoneNumber,
      BeginningDate: new Date(this.profile.BeginningDate+"Z"),
      BirthDate: new Date(this.profile.BirthDate+"Z"),
      Profession: this.profile.Profession,
      Street: this.profile.Street,
      ParentEmail:this.profile.ParentEmail,
      ZipCode: this.profile.ZipCode,
      City: this.profile.City,
      Country: this.profile.Country,
      Photopath:  this.profile.PhotoPath
    });   

    let formValue = { ...this.profileForm.value };  
     for (let prop in formValue) {
      if (!formValue[prop]) {
        delete formValue[prop];
      }
    
    }
    var progress = Object.keys(formValue).length
    this.value =  Math.floor( progress * 10);
    if (this.value >= 130) {
      this.value = 100;
    }else{
      this.value =Math.floor(Object.keys(formValue).length*7.6);
    }
  }
  findRole(id){ 
    return this.MemberStatus.find(x=>x.value==id)?.label
   } 
   

}