import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule   } from '@angular/common/http/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { ActivatedRoute            } from '@angular/router';
import { NO_ERRORS_SCHEMA          } from '@angular/core';
import { of                        } from 'rxjs';

import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';

import { RbacEditComponent         } from './rbac-edit.component';

describe('RbacEditComponent', () =>
{
    let component: RbacEditComponent;
    let fixture  : ComponentFixture<RbacEditComponent>;

    let http     = jasmine.createSpyObj<HttpService>('HttpService', ['read', 'update']);
    const perm   = { items: [
        { value: 1, type: "Consultation des Rôles" },
        { value: 2, type: "Gestion des Rôles"      }
    ]};
    let roleId   = 7;

    // let route = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['navigate']);
    // let router: Router;
    // let activatedRoute;
    // const activatedRouteStub = {
    //     paramMap: {
    //         subscribe()
    //         {
    //             return roleId > 0
    //                 ? of({snapshot: {url: []}})
    //                 : of({snapshot: {url: [{path: roleId}]}});
    //         }
    //     }
    // };

    beforeAll(() => {
        http.read.and.returnValue(of({...perm}));
        http.update.and.returnValue(of({...perm}));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [RbacEditComponent],
            providers    : [
                { provide: HttpService,    useValue: http },
                // { provide: ActivatedRoute, useFactory: () => activatedRouteStub },
                { provide: ActivatedRoute, useValue: {snapshot: {url: [{path: roleId}]}} },
                NotificationService,
                
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // router = TestBed.inject(Router);
        // activatedRoute = TestBed.inject(ActivatedRoute);

        // route.navigate.and.callFake((url: string) =>
        //     roleId > 0
        //         ? of({snapshot: {url: []}})
        //         : of({snapshot: {url: [{path: roleId}]}})
        // );

        fixture   = TestBed.createComponent(RbacEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // spyOn(router, 'navigate');

        expect(component).toBeTruthy();
        expect(component.roleId).toBe(roleId);
    });

    it('should load all permissions', () => {
        expect(component.allPermissions.length).toBe(36);
    });

    it('should load available permissions', () => {
        expect(component.availablePermissions.length).toBe(34);
    });

    it('should load selected permissions', () => {
        expect(component.selectedPermissions.length).toBe(2);
    });

    it('should loading & error variables falsy', () =>
    {
        expect(component.loading).toBeFalse();
        expect(component.error).toBeFalsy();
    });
});