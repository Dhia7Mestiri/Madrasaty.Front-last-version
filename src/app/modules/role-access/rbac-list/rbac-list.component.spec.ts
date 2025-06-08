/*import { HttpClientTestingModule   } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA          } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { Router                    } from '@angular/router';
import { of                        } from 'rxjs';

import { ColumnsService            } from '@services/columns/columns.service';
import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';
import { PermissionsService        } from '@services/permissions-service/permissions.service';
import { IRole                     } from '@interfaces/role';
// import { IGridRow               } from '@interfaces/row';
import { Page                      } from '@enums/page';
import { GridRowButton             } from '@enums/grid-row-button';
import { SaveButtonAction          } from '@enums/save-button-action';

import { RbacListComponent         } from './rbac-list.component';

import * as consts from '@consts/global.consts';

describe('RbacListComponent', () =>
{
    let component: RbacListComponent;
    let fixture  : ComponentFixture<RbacListComponent>;
    let compiled : HTMLElement;

    let http     = jasmine.createSpyObj<HttpService>('HttpService', ['update', 'delete']);
    let perm     = jasmine.createSpyObj<PermissionsService>('PermissionsService', ['allowedTo']);
    let router   : Router;

    // let notif = jasmine.createSpyObj<NotificationService>('NotificationService', [
    //     'gridButtonClicked$', 'modalSaveBtnClicked$', 'rowSelected$'
    // ]);
    // let gridRow: IGridRow = {
    //     data   : [''],
    //     grid   : Grid.Roles
    // };

    beforeAll(() => {
        http.update.and.returnValue(of(null));
        http.delete.and.returnValue(of(null));
        perm.allowedTo.and.returnValue(true);

        // spyOnProperty(notif, 'rowSelected$', 'get').and.returnValue(of(gridRow));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [RbacListComponent],
            providers   : [
                { provide: HttpService,        useValue: http },
                { provide: PermissionsService, useValue: perm },
                // { provide: NotificationService, useValue: notif },
                NotificationService,
                ColumnsService,
                
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        router    = TestBed.inject(Router);

        fixture   = TestBed.createComponent(RbacListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        compiled  = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe/listen to changes using observables', () => {
        expect(component.subscriptions.length).toBe(4);
    });

    it('should load the columns', () => {
        expect(component.columns.length).toBe(4);
    });

    it('should loading & error variables falsy', () =>
    {
        expect(component.loading).toBeFalse();
        expect(component.error).toBeFalsy();
    });

    // it('should test the rowSelected$ observable', () =>
    // {
    //     component..notif.rowSelected$ = of(notif.rowSelected$.);
    //     expect(component.loading).toBeFalse();
    //     expect(component.error).toBeFalsy();
    // });

    it('should show rename modal correctly', () =>
    {
        component.showRbacModal({ 
            data  : [''],
            page  : Page.Roles,
            button: 'ren'
        });

        expect(component.action).toBe(GridRowButton.Rename);
        expect(component.saveBtnCaption).toBe("Renommer");
        expect(component.modalTitle).toBe("Renommer ce rôle");
        expect(component.modalIsVisible).toBeTrue();

        // Assertion beyond the scope of this unit test!
        // expect(component.renameInput).toBeTruthy();
        // expect(compiled.querySelector('input')).toBeTruthy();

        // expect(compiled.querySelector('.del')).toBeFalsy();
    });

    it('should show delete modal correctly', () =>
    {
        component.showRbacModal({ 
            data  : [''],
            page  : Page.Roles,
            button: 'del'
        });

        expect(component.action).toBe(GridRowButton.Delete);
        expect(component.saveBtnCaption).toBe("Supprimer");
        expect(component.modalTitle).toBe("Êtes-vous sûr?");
        expect(component.modalIsVisible).toBeTrue();

        // Assertion beyond the scope of this unit test!
        // expect(component.renameInput).toBeTruthy();
        // expect(compiled.querySelector('input')).toBeTruthy();

        // expect(compiled.querySelector('.del')).toBeFalsy();
    });

    it('should render new role account modal', () =>
    {
        fixture.detectChanges();

        component.showNewRoleModal();

        expect(component.action).toBe(GridRowButton.New);
        expect(component.saveAction).toBe(SaveButtonAction.New);

        expect(component.saveBtnCaption).toBe("Créer");
        expect(component.modalTitle).toBe(consts.newRoleBtnCaption);
        expect(component.modalIsVisible).toBe(true);
    });

    it('should navigate to role permissions page when clicking on the in-grid edit button', () =>
    {
        spyOn(router, 'navigate');
        const role: IRole = { id: 1, name: "Admin"};

        component.showRbacModal({ 
            data  : role,
            page  : Page.Roles,
            button: 'edit'
        });

        expect(router.navigate).toHaveBeenCalledWith(['roles', role.id, 'permissions']);
    });
});*/