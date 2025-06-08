/*import { HttpClientTestingModule   } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA          } from '@angular/core';
import { ComponentFixture, TestBed,
         waitForAsync              } from '@angular/core/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { of                        } from 'rxjs';

import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';
import { NewRoleComponent          } from './new-role.component';

describe('NewRoleComponent', () =>
{
    let component: NewRoleComponent;
    let fixture  : ComponentFixture<NewRoleComponent>;
    let compiled : HTMLElement;

    let http        = jasmine.createSpyObj<HttpService>('HttpService', ['create']);
    const newRoleId = 1;
    const roleName  = "New Role Name";

    beforeAll(() => {
        http.create.and.returnValue(of(newRoleId));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [NewRoleComponent],
            providers   : [
                { provide: HttpService, useValue: http },
                NotificationService,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(NewRoleComponent);
        component = fixture.componentInstance;
        compiled  = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should subscribe/listen to changes using observables', () => {
        fixture.detectChanges();
        expect(component.subscriptions.length).toBe(1);
    });

    it('should display input box', () => {
        fixture.detectChanges();
        expect(compiled.querySelector('input')).toBeTruthy();
    });

    it('should create new role', waitForAsync(() =>
    {
        component.error       = "...";
        component.newRoleName = roleName;

        component.createNewRole();

        fixture.detectChanges();

        expect(component.loading).toBeFalse();
        expect(component.error).toBe("");
    }));

    it('should loading & error variables falsy', () =>
    {
        fixture.detectChanges();

        expect(component.loading).toBeFalse();
        expect(component.error).toBeFalsy();
    });
});*/