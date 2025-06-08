/*import { HttpClientTestingModule   } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';
import { PermissionsService        } from '@services/permissions-service/permissions.service';
import { UserRolesAction           } from '@enums/user-roles-action';

import { UsersListComponent        } from './users-list.component';

describe('UsersListComponent', () =>
{
    let component: UsersListComponent;
    let fixture  : ComponentFixture<UsersListComponent>;
    let perm     = jasmine.createSpyObj<PermissionsService>('PermissionsService', ['allowedTo']);

    beforeAll(() => {
        perm.allowedTo.and.returnValue(true);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            declarations: [UsersListComponent],
            providers   : [
                { provide: PermissionsService, useValue: perm                 },
                HttpService,
                NotificationService,
                
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create data table', () => {
        let compiled = fixture.nativeElement as HTMLElement;
        // expect(component.dataTable).toBeTruthy();
        expect(compiled.querySelector('app-data-table')).toBeTruthy();
    });

    it('should create generic modal dialog', () => {
        let compiled = fixture.nativeElement as HTMLElement;
        // expect(component.dataTable).toBeTruthy();
        expect(compiled.querySelector('app-generic-modal-dialog')).toBeTruthy();
    });

    it('should load the columns', () => {
        expect(component.columns.length).toBe(7);
    });

    it('should subscribe/listen to changes using observables', () => {
        expect(component.subscriptions.length).toBe(3);
    });

    it('should show roles for the selected user in a modal dialog', () =>
    {
        component.selectedUsers = [{
            id       : 1,
            firstName: "John",
            role     : "Admin",
            email    : "john@doe.com"
        }];
        fixture.detectChanges();
        component.showRolesForSelectedUser();

        expect(component.backBtnCaption).toBe("");
        expect(component.saveBtnCaption).toBe("Fermer");
        expect(component.modalTitle).toBe("Les rôles auquel cet utilisateur appartient");
        expect(component.modalIsVisible).toBe(true);

        // Deeper assertions are beyond the scope of this unit test
    });

    it('should show permissions for the selected user in a modal dialog', () =>
    {
        component.selectedUsers = [{
            id       : 1,
            firstName: "John",
            role     : "Admin",
            email    : "john@doe.com"
        }];
        fixture.detectChanges();
        component.showPermissionsForSelectedUser();

        expect(component.backBtnCaption).toBe("");
        expect(component.saveBtnCaption).toBe("Fermer");
        expect(component.modalTitle).toBe("Les permissions que cet utilisateur possède");
        expect(component.modalIsVisible).toBe(true);

        // Deeper assertions are beyond the scope of this unit test
    });

    it('should show a modal dialog with a list to add/pick users', () =>
    {
        component.roleId = 1;
        fixture.detectChanges();
        component.showAddUsersModal();

        expect(component.backBtnCaption).toBe("Annuler");
        expect(component.saveBtnCaption).toBe("Ajouter");
        expect(component.modalTitle).toBe("Ajouter des utilisateurs à ce rôle");
        expect(component.modalIsVisible).toBe(true);

        // Deeper assertions are beyond the scope of this unit test
    });

    it("should NOT show a modal dialog with a list to remove users from selected role (when there are NO selected users)", () =>
    {
        component.showRemoveUsersModal();

        expect(component.backBtnCaption).toBe("");
        expect(component.modalIsVisible).toBe(false);

        // Deeper assertions are beyond the scope of this unit test
    });

    it('should show a modal dialog with a list to remove users from selected role', () =>
    {
        component.selectedUsers = [{
            id       : 1,
            firstName: "John",
            role     : "Admin",
            email    : "john@doe.com"
        }];
        fixture.detectChanges();
        component.showRemoveUsersModal();

        expect(component.backBtnCaption).toBe("Annuler");
        expect(component.saveBtnCaption).toBe("Confirmer");
        expect(component.modalTitle).toBe("Êtes-vous sûr?");
        expect(component.action).toBe(UserRolesAction.RemoveFromRole);
        expect(component.modalIsVisible).toBe(true);

        // Deeper assertions are beyond the scope of this unit test
    });
});*/