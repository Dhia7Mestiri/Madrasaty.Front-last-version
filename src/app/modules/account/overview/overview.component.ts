import { Component, OnInit      } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe             } from '@stripe/stripe-js';

import { MembersListService } from '@services/members/members-list.service';
import { UserService        } from '@services/user.service';


@Component({
    selector   : 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls  : ['./overview.component.scss']
})
export class OverviewComponent implements OnInit
{
    memberData
    ischecked = false;
    genders=[{ value: true, name: 'Féminin' }, { value:false, name: 'Masculin' }];
    countries : any;
    currentMemberStatutId

    constructor(private activatedroute: ActivatedRoute, private memberService: MembersListService,
        private userservice: UserService)
    { }

    ngOnInit()
    {
        this.memberService.getCountries().subscribe((data) => {
            this.countries  = data
        });

        this.currentMemberStatutId = this.userservice.getMemberStatutId();

        this.activatedroute.data.subscribe((result: { res: any }) => {
            this.memberData = result.res;    
        });
    }

    getCountryVal(code)
    {
        return this.countries?.find(x => x.code == code).name;
    }

    getGendervalue(id: boolean)
    {
        return this.genders?.find(x => x.value == id).name;
    }



}