import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewUserComponent } from './card-view-user.component';

describe('CardViewUserComponent', () => {
  let component: CardViewUserComponent;
  let fixture: ComponentFixture<CardViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
