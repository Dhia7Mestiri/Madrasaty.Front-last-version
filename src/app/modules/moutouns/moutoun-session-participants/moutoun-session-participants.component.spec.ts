import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoutounSessionParticipantsComponent } from './moutoun-session-participants.component';

describe('SessionParticipantsComponent', () => {
  let component: MoutounSessionParticipantsComponent;
  let fixture: ComponentFixture<MoutounSessionParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoutounSessionParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoutounSessionParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
