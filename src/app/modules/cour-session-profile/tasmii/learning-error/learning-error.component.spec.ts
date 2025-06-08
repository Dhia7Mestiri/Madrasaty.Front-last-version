import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningErrorComponent } from './learning-error.component';

describe('LearningErrorComponent', () => {
  let component: LearningErrorComponent;
  let fixture: ComponentFixture<LearningErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
