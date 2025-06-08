import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewSchoolComponent } from './card-view-school.component';

describe('CardViewUserComponent', () => {
  let component: CardViewSchoolComponent;
  let fixture: ComponentFixture<CardViewSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
