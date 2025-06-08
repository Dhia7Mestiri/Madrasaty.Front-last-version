import { Component, Input,
         OnInit           } from '@angular/core';
import { FormGroup        } from '@angular/forms';
import { BehaviorSubject,
         Subscription     } from 'rxjs';

import { NotificationService } from '@services/notification/notification.service';
import { MembersListService  } from '@services/members/members-list.service';
import { UserService         } from '@services/user.service';

import { Member           } from '@models/member';
import { AccountComponent } from '@modules/account/account.component';

@Component({
    selector   : 'app-profile-details',
    templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit
{
    profileForm: FormGroup;
    genderOptions: any;
    countries: any;

    profile: Member;
    activeProfile: boolean;
    profileStatus: string;
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
    PhotoPath: string | ArrayBuffer;
    private unsubscribe: Subscription[] = [];
    errorMessage: any;
    UpPhoto: any;
    currentMemberStatutId
    value
    parent: AccountComponent

    @Input() ExpectedProp: Member;

    constructor(private notification: NotificationService, private memberService: MembersListService,
        private Userservice: UserService)
    { }

    ngOnInit()
    {
        this.profileForm = this.memberService.createProfileForm();
        this.genderOptions = [{ id: false, name: 'Masculin' }, { id: true, name: 'Féminin' }];
        this.memberService.getCountries().subscribe(
            (countriesData) => this.countries = countriesData,
        
        );
      
        this.currentMemberStatutId = this.Userservice.getMemberStatutId();

        this.displayProfile(this.ExpectedProp);
    }

    onChange(file: File)
    {
        if (!file)
            return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = event => {
            this.UpPhoto = reader.result;
            this.PhotoPath = this.UpPhoto;
        };
    }

    displayProfile(member: any)
    {
        if (this.profileForm) {
            this.profileForm.reset();
        }
        this.profile = member;
        this.activeProfile = (this.profile.Status == 2 || this.profile.Status == 4) ? true : false;  
        this.profileForm.patchValue({
            LastName: this.profile.LastName,
            FirstName: this.profile.FirstName,
            Female: this.profile.Female,
            SkypeId: this.profile.SkypeId,
            PhoneNumber: this.profile.PhoneNumber,
            CreatedOn: new Date(this.profile.CreatedOn + "Z"),
            BirthDate: new Date(this.profile.BirthDate + "Z"),
      
            Street: this.profile.Street,
            ZipCode: this.profile.ZipCode,
            City: this.profile.City,
            Country: this.profile.Country
        });

        this.PhotoPath = this.memberService.GetMemberPhotoPath(this.profile.Photo);
    }

    updateProfile()
    {
        const currentProfile = { ...this.profile, ...this.profileForm.value };

        if (this.UpPhoto != null && this.UpPhoto != undefined)
        {
            currentProfile.Photo = this.UpPhoto;
            var array = currentProfile.Photo.split(",", 3);
            currentProfile.Photo = array[1];
        }

        let profileModel = {
            Member: currentProfile,
            Password: this.profile.Password,
            Photo: currentProfile.Photo
        }

        this.memberService.updateProfile(profileModel)
            .subscribe({
                next: () => { this.notification.showSuccess("Profile modifé avec succès") },
                error: err => this.notification.showError(err.error.Message),
                complete: () => { this.memberService.setRefreshrequired({ Model: profileModel.Member, Photo: this.PhotoPath }) }

            });
    }
}