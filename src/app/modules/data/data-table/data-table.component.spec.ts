import { HttpClientTestingModule,
         HttpTestingController     } from '@angular/common/http/testing';
import { ComponentFixture, TestBed,
         waitForAsync              } from '@angular/core/testing';
import { RouterTestingModule       } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA          } from '@angular/core';
import { of                        } from 'rxjs';

import { NotificationService       } from '@services/notification.service';
import { HttpService               } from '@services/http-service/http.service';
import { PermissionsService        } from '@services/permissions-service/permissions.service';
import { Permission                } from '@enums/permission';
import { DataTableComponent        } from './data-table.component';

describe('DataTableComponent', () =>
{
    let component: DataTableComponent;
    let fixture  : ComponentFixture<DataTableComponent>;
    let httpCtrl : HttpTestingController;
    let http     = jasmine.createSpyObj<HttpService>('HttpService', ['read']);
    let perm     = jasmine.createSpyObj<PermissionsService>('PermissionsService', ['allowedTo']);
    let data     = {
        totalRecords: 1,
        totalPages  : 1,
        pageNumber  : 0,
        items: [
            { id: 1, refClient: "sv_12345", siret: 5146713835430, raisonSociale: "IYA Soft" }
        ]
    };
    const columns: any[] = [
        { type: "button", field: 'edit',      header: '', css: 'text-center', sortable: false, filter: false, width: '25px', icon: 'bi bi-pencil-square' },
        { type: "text",   field: 'id',        header: 'ID',                   sortable: true,  filter: true,  filterMatchMode: 'contains', css: 'd-none', width: '25px' },
        { type: "text",   field: 'firstName', header: 'Prénom',               sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
        { type: "text",   field: 'lastName',  header: 'Nom',                  sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
        { type: "email",  field: 'email',     header: 'Email',                sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
    ];

    beforeAll(() => {
        (http.read as jasmine.Spy).and.returnValue(of({...data}));
        (perm.allowedTo as jasmine.Spy).and.returnValue(true);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [HttpClientTestingModule, RouterTestingModule],
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [DataTableComponent],
            providers   : [
                { provide: HttpService,        useValue: http },
                { provide: PermissionsService, useValue: perm },
                NotificationService,
                
            ]
        })
            .compileComponents();

        httpCtrl = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture           = TestBed.createComponent(DataTableComponent);
        component         = fixture.componentInstance;
        component.columns = Object.assign([], columns);  // {...columns};
    });

    afterEach(() => {
        // Assert that there are no more pending requests left 
        httpCtrl.verify();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should subscribe/listen to changes using observables', () => {
        fixture.detectChanges();
        expect(component.subscriptions.length).toBe(5);
    });

    it('should load the columns', () => {
        fixture.detectChanges();
        expect(component.columns).toEqual(Object.assign([], columns));  // {...columns});
    });

    it('should exclude column buttons from realColumns variable', () => {
        fixture.detectChanges();
        expect(component.realColumns.length).toBe(columns.length - 1);
    });
    
    it('should check the values of colStorage and sideBar', () => {
        component.colStorage = '';
        component.sideBar    = "Ref. Client";

        fixture.detectChanges();

        expect(component.colStorage).toEqual(component.sideBar);
    });

    it('should return sample data when calling http.read()', waitForAsync(() =>
    {
        component.urlPath     = "clients";
        component.permissions = [Permission.ViewRoles];
        component.getData();

        fixture.detectChanges();

        // Make sure that [component.dataRows] property values were updated after the http.read() call
        expect(component.dataRows!.Items[0].id           ).toBe(data.items[0].id);
        expect(component.dataRows!.Items[0].siret        ).toBe(data.items[0].siret);
        expect(component.dataRows!.Items[0].refClient    ).toBe(data.items[0].refClient);
        expect(component.dataRows!.Items[0].raisonSociale).toBe(data.items[0].raisonSociale);
    }));
});