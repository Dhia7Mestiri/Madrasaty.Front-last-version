import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensNotesComponent } from './examens-notes.component';

describe('ExamensNotesComponent', () => {
  let component: ExamensNotesComponent;
  let fixture: ComponentFixture<ExamensNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamensNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamensNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
