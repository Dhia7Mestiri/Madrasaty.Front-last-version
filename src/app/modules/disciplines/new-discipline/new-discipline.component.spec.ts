import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisciplineComponent } from './new-discipline.component';

describe('NewDisciplineComponent', () => {
  let component: NewDisciplineComponent;
  let fixture: ComponentFixture<NewDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
