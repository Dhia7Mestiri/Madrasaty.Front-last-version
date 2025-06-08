import { NgModule       } from '@angular/core';
import { CommonModule   } from '@angular/common';

import { PickListModule } from 'primeng/picklist';
import { ListboxModule  } from 'primeng/listbox';

import { SharedModule            } from '@shared/shared.module';
import { DataModule              } from '@modules/data/data.module';
import { RoleAccessRoutingModule } from './role-access-routing.module';
import { RbacListComponent       } from './rbac-list/rbac-list.component';
import { RoleAccessComponent     } from './role-access.component';
import { RbacEditComponent       } from './rbac-edit/rbac-edit.component';
import { UserRolesListComponent  } from './user-roles-list/user-roles-list.component';
import { UsersListComponent      } from './users-list/users-list.component';
import { AddUsersToRoleComponent } from './add-users-to-role/add-users-to-role.component';
import { NewRoleComponent        } from './new-role/new-role.component';


@NgModule({
    declarations: [
        RoleAccessComponent,
        RbacListComponent,
        RbacEditComponent,
        UserRolesListComponent,
        UsersListComponent,
        AddUsersToRoleComponent,
        NewRoleComponent,
    ],
    imports: [
        CommonModule,
        RoleAccessRoutingModule,
        DataModule,
        SharedModule,
        PickListModule,
        ListboxModule,
    ]
})
export class RoleAccessModule { }