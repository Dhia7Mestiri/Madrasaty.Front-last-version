import { Component, OnInit  } from '@angular/core';
import { TreeNode           } from 'primeng/api';

import { TajwidErrorService } from '@services/tajwid-error/tajwid-error.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { Permission } from '@enums/permission';

@Component({
    selector   : 'app-tajwid-error',
    templateUrl: './tajwid-error.component.html',
    styleUrls  : ['./tajwid-error.component.scss']
})

export class TajwidErrorComponent implements OnInit
{
    tajwidErrorData;
    files: TreeNode[];
    pageTitle="Erreur de tajwid"
    permissions = [Permission.ViewTajwidError];
    constructor(
        private tajwidErrorService: TajwidErrorService,
        private perm: PermissionsService,
         private router: Router,
         private notif:NotificationService
        )
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
        return;

    this.notif.updatePageTitle({
        title     : this.pageTitle, 
        toggleView: true,
        orderBy   : true,
        breadcrumb: [
            { text: this.pageTitle, url: '/tajwid-error' },
        ],
        actionsBtn: [ ]
    });

        this.tajwidErrorService.getTajwidErrorsforTree().subscribe(
            TajwidErrorData => {
                this.tajwidErrorData = TajwidErrorData
                this.files = [{
                    expanded: true,
                    "label": "Les erreurs de Tajweed",
                    "collapsedIcon": "pi pi-chevron-right",
                    "expandedIcon": "pi pi-chevron-down",
                    children: TajwidErrorData
                }];
            },
        );
       

}

    expandAll()
    {
        this.files.forEach(node => { this.expandRecursive(node, true) });
    }

    collapseAll()
    {
        this.files.forEach(node => { this.expandRecursive(node, false) });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean)
    {
        node.expanded = isExpand;
        if (node.children)
        {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
    private grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }

  
}