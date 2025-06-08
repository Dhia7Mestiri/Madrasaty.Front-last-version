import { ComponentFixture, TestBed    } from '@angular/core/testing';
import { MessageService               } from 'primeng/api';
import { SuccessNotificationComponent } from './success-notification.component';

describe('SuccessNotificationComponent', () => {
    let component: SuccessNotificationComponent;
    let fixture  : ComponentFixture<SuccessNotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SuccessNotificationComponent],
            providers   : [MessageService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(SuccessNotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display title as a toastr', () => {
        component.title      = "Success";
        component.showToastr = true;
        fixture.detectChanges();
        const compiled       = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('p-toast')).toBeTruthy();
        expect(compiled.querySelector('.alert-dismissible')).toBeFalsy();
    });

    it('should display title as a closable panel', () => {
        component.title      = "Success";
        component.showToastr = false;
        fixture.detectChanges();
        const compiled       = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('h4')?.textContent).toContain("Success");
        expect(compiled.querySelector('.alert-dismissible')).toBeTruthy();
        expect(compiled.querySelector('p-toast')).toBeFalsy();
    });
});