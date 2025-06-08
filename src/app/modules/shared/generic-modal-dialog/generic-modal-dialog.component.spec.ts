import { ComponentFixture, TestBed   } from '@angular/core/testing';
import { NotificationService         } from '@services/notification.service';
import { GenericModalDialogComponent } from './generic-modal-dialog.component';

describe('GenericModalDialogComponent', () => {
    let component: GenericModalDialogComponent;
    let fixture  : ComponentFixture<GenericModalDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenericModalDialogComponent],
            providers   : [NotificationService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(GenericModalDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display modal dialog', () => {
        component.showModal = true;
        fixture.detectChanges();
        const compiled      = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('p-dialog')).toBeTruthy();
    });

    it('single-step modals should have NO subscription to modal step change notifications', () => {
        component.stepsCount = 1;
        component.showModal  = true;

        fixture.detectChanges();
        expect(component.stepChanged).toBeUndefined();
    });

    it('should subscribe to modal step change notification (if multi-step modal)', () => {
        component.stepsCount = 2;
        component.showModal  = true;

        fixture.detectChanges();
        expect(component.stepChanged).toBeTruthy();
    });
});