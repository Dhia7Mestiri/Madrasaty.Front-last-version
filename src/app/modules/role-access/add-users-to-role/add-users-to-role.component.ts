import { Component,
         Input, ViewChild   } from '@angular/core';

import { Page               } from '@enums/page';
import { Permission         } from '@enums/permission';
import { ColumnsService     } from '@services/columns/columns.service';
import { DataTableComponent } from '@modules/data/data-table/data-table.component';


@Component({
    selector   : 'app-add-users-to-role',
    templateUrl: './add-users-to-role.component.html',
    styleUrls  : ['./add-users-to-role.component.scss']
})
export class AddUsersToRoleComponent
{
    @Input()
    roleId     !: number;

    @ViewChild(DataTableComponent)
    dataTable  !: DataTableComponent;

    columns     = this.columnsSrv.getUsersListColumns();
    urlPath     = "";
    page        = Page.UsersToAddToRole;
    permissions = [Permission.ManageRoles];

    constructor(private columnsSrv: ColumnsService)
    { }

    async getUsers(roleId: number)
    {
        this.roleId  = roleId;
        this.urlPath = "users/not-in-role/" + this.roleId;

        if (!this.dataTable)
            return;

        this.dataTable.urlPath = this.urlPath;
        await this.dataTable.getData();
    }
}