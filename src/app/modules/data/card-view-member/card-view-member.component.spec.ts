import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewMemberComponent } from './card-view-member.component';

describe('CardViewMemberComponent', () => {
  let component: CardViewMemberComponent;
  let fixture: ComponentFixture<CardViewMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
