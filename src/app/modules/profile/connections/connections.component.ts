import { Component, OnInit   } from '@angular/core';
import { SelectItem          } from 'primeng/api';

import { MembersListService  } from '@services/members/members-list.service';
import { NotificationService } from '@services/notification/notification.service';

import { UserType            } from '@models/UserType';

@Component({
    selector: 'app-connections',
    templateUrl: './connections.component.html',
})

export class ConnectionsComponent implements OnInit
{
    rowData
    search = ""
    pagenumber = 1
    selectedRole = 0
    MemberStatusId: SelectItem[]
    MembersCoun

    result
    constructor(private members: MembersListService, private notification: NotificationService)
    { }

    ngOnInit()
    {
        this.MemberStatusId = Object.keys(UserType).map(key => ({ label: key, value: UserType[key] }));
        this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    }

    paginate(event)
    {
        this.pagenumber = event.page + 1;
        this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    }

    searchResult(data)
    {
        this.search = data.target.value;
        this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    }
     findRole(id){
       return this.MemberStatusId.find(x=>x.value==id).label
      } 

    onSelectChange(arg)
    {
        this.selectedRole = this.result;
        this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    }

    refreshMemberList(pagenumber, search, role)
    {
        this.members.getMembers(1,pagenumber, search, role).subscribe(
        {
            next: membersData => {
                this.rowData = membersData['Items'];
                if (membersData.length == 0) {
                    this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !")
                }

            },
            error: err => console.log(err)
        });
    }
}