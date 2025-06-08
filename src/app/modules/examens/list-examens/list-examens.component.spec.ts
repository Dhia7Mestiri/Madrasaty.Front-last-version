import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamensComponent } from './list-examens.component';

describe('ListExamensComponent', () => {
  let component: ListExamensComponent;
  let fixture: ComponentFixture<ListExamensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExamensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
