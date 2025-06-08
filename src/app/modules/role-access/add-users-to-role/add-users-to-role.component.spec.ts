import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUsersToRoleComponent   } from './add-users-to-role.component';

describe('AddUsersToRoleComponent', () => {
    let component: AddUsersToRoleComponent;
    let fixture  : ComponentFixture<AddUsersToRoleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddUsersToRoleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(AddUsersToRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load the columns', () => {
        expect(component.columns.length).toBe(5);
    });

    it('should create data table', () => {
        let compiled = fixture.nativeElement as HTMLElement;
        // expect(component.dataTable).toBeTruthy();
        expect(compiled.querySelector('app-data-table')).toBeTruthy();
    });

    it('should assign variables urlPath & roleId when calling method getUsers()', async () => {
        await component.getUsers(1);
        fixture.detectChanges();

        expect(component.roleId).toBe(1);
        expect(component.urlPath).toBe("users/not-in-role/1");
    });
});