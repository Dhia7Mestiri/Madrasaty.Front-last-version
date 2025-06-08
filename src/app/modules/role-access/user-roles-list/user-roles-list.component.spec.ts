import { HttpClientTestingModule   } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA          } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { of                        } from 'rxjs';

import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';

import { UserRolesListComponent    } from './user-roles-list.component';

describe('UserRolesListComponent', () =>
{
    let component: UserRolesListComponent;
    let fixture  : ComponentFixture<UserRolesListComponent>;

    let http     = jasmine.createSpyObj<HttpService>('HttpService', ['read']);
    const roles  = { Items: ["User", "Admin"]};
    const perm   = { Items: ["Consultation des Rôles", "Gestion des Rôles"]};

    beforeAll(() => {
        http.read.and.callFake(url =>
            url.indexOf('permissions') >= 0 ? of(perm) : of(roles)
        );
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [UserRolesListComponent],
            providers    : [
                { provide: HttpService, useValue: http },
                NotificationService
            ]
        })
            .compileComponents();

        fixture   = TestBed.createComponent(UserRolesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create p-listbox', () => {
        let compiled = fixture.nativeElement as HTMLElement;
        // expect(component.dataTable).toBeTruthy();
        expect(compiled.querySelector('p-listbox')).toBeTruthy();
    });


    it('should load all permissions', () => {
        expect(component.allPermissions.length).toBe(36);
    });

    it('should get permissions for a given user', () => {
        component.getPermissionsForUser(2);

        expect(component.userId).toBe(2);
        expect(component.urlPath).toBe("users/2/permissions");
        expect(component.optionLabel).toBe("type");
        expect(component.optionValue).toBe("value");

        expect(component.data$.value).toEqual(perm.Items);
    });

    it('should get roles for a given user', () => {
        component.getRolesForUser(5);

        expect(component.userId).toBe(5);
        expect(component.urlPath).toBe("roles/user/5");
        expect(component.optionLabel).toBe("name");
        expect(component.optionValue).toBe("id");

        expect(component.data$.value).toEqual(roles.Items);
    });

    it('should loading & error variables falsy', () =>
    {
        expect(component.loading).toBeFalse();
        expect(component.error).toBeFalsy();
    });
});