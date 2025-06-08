import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourSessionsComponent } from './cour-sessions.component';

describe('CourSessionsComponent', () => {
  let component: CourSessionsComponent;
  let fixture: ComponentFixture<CourSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
