import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiSessionParticipantsComponent } from './tasmii-session-participants.component';

describe('SessionParticipantsComponent', () => {
  let component: TasmiiSessionParticipantsComponent;
  let fixture: ComponentFixture<TasmiiSessionParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasmiiSessionParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasmiiSessionParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
