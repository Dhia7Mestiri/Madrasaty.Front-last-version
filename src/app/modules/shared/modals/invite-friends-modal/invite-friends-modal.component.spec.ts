import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendsModalComponent } from './invite-friends-modal.component';

describe('InviteFriendsModalComponent', () => {
  let component: InviteFriendsModalComponent;
  let fixture: ComponentFixture<InviteFriendsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteFriendsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFriendsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
