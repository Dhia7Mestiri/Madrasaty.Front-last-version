import { Component, OnInit      } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MembersListService     } from '@services/members/members-list.service';
import { Member                 } from '@models/member';

@Component({
    selector   : 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit
{
    currentMemberId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['id'];
    memberData = new Member()
    PhotoPath
    src
    profile
    profileForm: FormGroup;
    value

    constructor(public memberService: MembersListService, private formBuilder: FormBuilder)
    { }

    ngOnInit()
    {
        this.profileForm = this.formBuilder.group({
            LastName: ['',],
            FirstName: [''],
            Gender: [''],
            SkypeId: [''],
            PhoneNumber: '',
            BeginningDate: [''],
            BirthDate: [''],
            Profession: [''],
            Street: [''],
            ZipCode: [''],
            City: ['',],
            Country: [''],
            Photopath: [''],
        });


        this.getMember();
    }
    getMember()
    {
        this.memberService.getMember(this.currentMemberId)
            .subscribe(data => {

                this.memberData = data;
                this.src = this.memberService.GetMemberPhotoPath(this.memberData.Photo)
                console.log(this.memberData)
                this.displayProfile(this.memberData)
            });
    }

    displayProfile(member: any)
    {
        this.profile = member;

        this.profileForm.patchValue({
            LastName: this.profile.LastName,
            FirstName: this.profile.FirstName,
            Gender: this.profile.Gender,
            SkypeId: this.profile.SkypeId,
            PhoneNumber: this.profile.PhoneNumber,
            BeginningDate: new Date(this.profile.BeginningDate + "Z"),
            BirthDate: new Date(this.profile.BirthDate + "Z"),
            Profession: this.profile.Profession,
            Street: this.profile.Street,
            ZipCode: this.profile.ZipCode,
            City: this.profile.City,
            Country: this.profile.Country,
            Photo: this.memberData.Photo
        });
        let formValue = { ...this.profileForm.value };

        for (let prop in formValue) {
            if (!formValue[prop]) {
                delete formValue[prop];
            }

        }

        var progress = Object.keys(formValue).length;
        console.log(progress);
        this.value = Math.floor(progress * 10);
        if (this.value >= 130) {
            this.value = 100;
        } else {
            this.value = Math.floor(Object.keys(formValue).length * 7.6);
        }
    }
}