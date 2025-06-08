import { ComponentFixture, TestBed  } from '@angular/core/testing';
import { ErrorNotificationComponent } from './error-notification.component';

describe('ErrorNotificationComponent', () => {
    let component: ErrorNotificationComponent;
    let fixture  : ComponentFixture<ErrorNotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorNotificationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(ErrorNotificationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display title + message', () => {
        component.title   = "error";
        component.message = "error message";
        fixture.detectChanges();
        const compiled    = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('h4')).toBeTruthy();
    });
});
