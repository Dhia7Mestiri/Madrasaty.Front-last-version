import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewClassroomComponent } from './card-view-classroom.component';

describe('CardViewUserComponent', () => {
  let component: CardViewClassroomComponent;
  let fixture: ComponentFixture<CardViewClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
