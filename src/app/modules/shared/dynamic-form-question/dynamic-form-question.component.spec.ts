import { ComponentFixture,
         inject,
         TestBed, waitForAsync  } from '@angular/core/testing';
import { FormsModule,
         ReactiveFormsModule    } from '@angular/forms';

import { InputQuestion          } from '@services/questions/question-input';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionBase           } from '@services/questions/question-base';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

describe('DynamicFormQuestionComponent', () =>
{
    let component: DynamicFormQuestionComponent;
    let fixture  : ComponentFixture<DynamicFormQuestionComponent>;
    class MockQuestionBase {
        
    }
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports     : [FormsModule, ReactiveFormsModule],
            declarations: [DynamicFormQuestionComponent],
            providers   : [
                QuestionControlService,
                { provide: QuestionBase, useClass: MockQuestionBase },
            ]
        })
        .compileComponents();
    }));

    beforeEach(inject([QuestionControlService], (questionCtrl: QuestionControlService) =>
    {
        fixture        = TestBed.createComponent(DynamicFormQuestionComponent);
        component      = fixture.componentInstance;

        component.question = new InputQuestion({
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
        });
        component.form = questionCtrl.toFormGroup([component.question]);

        fixture.detectChanges();
    }));

    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should display form question', () =>
    {
        const compiled = fixture.nativeElement as HTMLElement;

        // const ctrl     = compiled.querySelector('#adresse1') as HTMLInputElement;
        // expect(ctrl.value).toBe('123 hello street');
        // expect(ctrl.attributes['ng-reflect-model'].value).toBe('123 hello street');

        expect((compiled.querySelector('#adresse1') as HTMLInputElement)?.value).toBe('123 hello street');
    });
});