/*import { Injectable,
         OnDestroy           } from '@angular/core';
import { Subscription        } from 'rxjs';

import { Permission          } from '@enums/permission';
import { IUser               } from '@interfaces/user';
import { IClaim              } from '@interfaces/claim';
import { log                 } from '@functions/log';
// import { AuthorizeService } from '@services/authorize-service/authorize.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { NotificationService } from '../notification.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService implements OnDestroy
{
    private user            !: IUser | null;
    private subscription    !: Subscription;
    private allPermissions   : IClaim[] = this.columnsSrv.getPermissions();
    private userPermissions !: IClaim[];

    constructor(private notif: NotificationService,  // private auth: AuthorizeService,
        private columnsSrv: ColumnsService)
    {
        this.getUser();
    }

    private getUser()
    {
        // this.subscription      = this.auth.getUser().subscribe(u =>
        // {
        //     const loginChanged = (this.user && !u) || (!this.user && u);
        //     this.user          = u;
        //     if (!u)
        //     {
        //         this.userPermissions = [];
        //     }
        //     else
        //     {
        //         const properties     = Object.entries(u);
        //         this.userPermissions = this.allPermissions.filter(perm =>
        //         {
        //             return properties.some(prop =>
        //                 prop[1] == perm.value &&
        //                 prop[0].length > 5
        //             );
        //         });
        //     }

        //     if (loginChanged)
        //     {
        //         log('PermissionsService -> loginChanged: ', u);
        //         this.notif.loginChanged(u);
        //     }

        //     log('PermissionsService -> user: ', u);
        //     log('PermissionsService -> userPermissions: ', this.userPermissions);
        // });
    }

    allowedTo(requestedPermissions: Permission[]) : boolean
    {
        const canAccess = true;  // this.user
            // ? (this.userPermissions.find((p: IClaim) =>
            //    requestedPermissions.find(perm => perm == p.value)) ? true : false
            // )
            // : false;

        log('PermissionsService.allowedTo(', requestedPermissions, '): canAccess: ', canAccess);

        return canAccess;
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
}*/
import { Injectable,
         OnDestroy           } from '@angular/core';
import { Subscription        } from 'rxjs';

import { Permission          } from '@enums/permission';
import { IUser               } from '@interfaces/user';
import { IClaim              } from '@interfaces/claim';
import { log                 } from '@functions/log';
// import { AuthorizeService } from '@services/authorize-service/authorize.service';
import { ColumnsService      } from '@services/columns/columns.service';
import { NotificationService } from '../notification.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@services/user.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService implements OnDestroy
{
    private user            !: IUser | null;
    private subscription    !: Subscription;
    private allPermissions   : IClaim[] = this.columnsSrv.getPermissions();
    private userPermissions !: IClaim[];

    constructor(private notif: NotificationService,  // private auth: AuthorizeService,
        private columnsSrv: ColumnsService,private http: HttpClient, private userService: UserService)
    {
        this.getUser();
    }

    private getUser()
    {
        const u = this.userService.UserLoggedIn as IUser;  // 👈 Get user directly
        const loginChanged = (this.user && !u) || (!this.user && u);
        this.user = u;
    
        if (!u) {
            this.userPermissions = [];
        } else if (u.role) {
            this.userPermissions = this.getPermissionsBasedOnRole(u.role);
        } else {
            const properties = Object.entries(u);
            this.userPermissions = this.allPermissions.filter(perm =>
                properties.some(prop =>
                    prop[1] == perm.value &&
                    prop[0].length > 5
                )
            );
        }
    
        if (loginChanged) {
            log('PermissionsService -> loginChanged: ', u);
            this.notif.loginChanged(u);
        }
    
        log('PermissionsService -> user: ', u);
        log('PermissionsService -> userPermissions: ', this.userPermissions);
        // this.subscription      = this.auth.getUser().subscribe(u =>
        // {
        //     const loginChanged = (this.user && !u) || (!this.user && u);
        //     this.user          = u;
        //     if (!u)
        //     {
        //         this.userPermissions = [];
        //     }
        //     else
        //     {
        //         const properties     = Object.entries(u);
        //         this.userPermissions = this.allPermissions.filter(perm =>
        //         {
        //             return properties.some(prop =>
        //                 prop[1] == perm.value &&
        //                 prop[0].length > 5
        //             );
        //         });
        //     }

        //     if (loginChanged)
        //     {
        //         log('PermissionsService -> loginChanged: ', u);
        //         this.notif.loginChanged(u);
        //     }

        //     log('PermissionsService -> user: ', u);
        //     log('PermissionsService -> userPermissions: ', this.userPermissions);
        // });
    }
    private getPermissionsBasedOnRole(role: string): IClaim[] {
        switch (role) {
            case 'Admin':
                return this.allPermissions; // Admin can do everything
    
            case 'Teacher':
                return this.allPermissions.filter(p =>
                    [
                        Permission.AddExam,
                        Permission.EditExam,
                        Permission.DeleteExam,
                        Permission.ViewExams,
                        Permission.ViewStudents,
                        Permission.ViewCourses,
                        Permission.ViewTasmiis,
                        Permission.ViewDisciplines,
                        Permission.ViewStatsTeacher,
                        Permission.ViewTajwidError,
                        //Permission.ViewRoles,
                        Permission.ManageRoles,
                        Permission.AddMoutoun,
                        Permission.EditMoutoun,
                        Permission.DeleteMoutoun,
                        Permission.ViewMoutouns,
                        Permission.ViewHolidays
                    ].includes(p.value as Permission)
                );
    
            case 'Student':
                return this.allPermissions.filter(p =>
                    [
                        Permission.ViewCourses,
                        Permission.ViewTasmiis,
                        Permission.ViewExams,
                        Permission.ViewTerms,
                        Permission.ViewDisciplines,
                        Permission.ViewStatsStudent,
                        Permission.ViewTajwidError
                    ].includes(p.value as Permission)
                );
                case 'Parent':
                    return this.allPermissions.filter(p=>
                    [
                        Permission.ViewStatsStudent
                    ]
                    );
    
            default:
                return [];
        }
    }
    

    allowedTo(requestedPermissions: Permission[]) : boolean
    {
        const canAccess = this.user
        ? (this.userPermissions.find((p: IClaim) =>
            requestedPermissions.find(perm => perm == p.value)) ? true : false
        )
        : false;

    log('PermissionsService.allowedTo(', requestedPermissions, '): canAccess: ', canAccess);

    return canAccess;
        
        //const canAccess = true;  // this.user
            // ? (this.userPermissions.find((p: IClaim) =>
            //    requestedPermissions.find(perm => perm == p.value)) ? true : false
            // )
            // : false;

        //log('PermissionsService.allowedTo(', requestedPermissions, '): canAccess: ', canAccess);

        //return canAccess;
    }

    ngOnDestroy()
    {
        this.subscription?.unsubscribe();
    }
}