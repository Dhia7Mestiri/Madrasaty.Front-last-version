import { waitForAsync,
         ComponentFixture,
         TestBed              } from '@angular/core/testing';
import { InputQuestion        } from '@services/questions/question-input';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture  : ComponentFixture<DynamicFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display form questions', () => {
        component.questions = [
            new InputQuestion({
                key       : 'adresse1',
                label     : 'N° + nom de rue',
                value     : '123 hello street',
                required  : false,
                order     : 1,
                minLength : 3,
                separator : false,
                step      : 1,
                newRow    : true,
                rowColumns: 2,
            }),
            new InputQuestion({
                key      : "adresse2",
                label    : "Complement d'adresse",
                value    : 'Menzah 1',
                required : false,
                order    : 2,
                step     : 1,
                newRow   : true,
            })
        ];
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('div.row')?.length).toEqual(2);

        expect(component).toBeTruthy();
    });
});