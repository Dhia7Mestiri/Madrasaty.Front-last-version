import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoutounSessionsComponent } from './moutoun-sessions.component';

describe('MoutounSessionsComponent', () => {
  let component: MoutounSessionsComponent;
  let fixture: ComponentFixture<MoutounSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoutounSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoutounSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
