import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsExercicesComponent } from './documents-exercices.component';

describe('DocumentsExercicesComponent', () => {
  let component: DocumentsExercicesComponent;
  let fixture: ComponentFixture<DocumentsExercicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsExercicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsExercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
