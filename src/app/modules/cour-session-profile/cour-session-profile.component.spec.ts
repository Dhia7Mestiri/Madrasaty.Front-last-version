import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourSessionProfileComponent } from './cour-session-profile.component';

describe('CourSessionProfileComponent', () => {
  let component: CourSessionProfileComponent;
  let fixture: ComponentFixture<CourSessionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourSessionProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourSessionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
