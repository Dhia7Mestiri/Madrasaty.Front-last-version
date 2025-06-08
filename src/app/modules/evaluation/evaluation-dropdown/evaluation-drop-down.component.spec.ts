import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDropDownComponent } from './evaluation-drop-down.component';

describe('EvaluationDropDownComponent', () => {
  let component: EvaluationDropDownComponent;
  let fixture: ComponentFixture<EvaluationDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
