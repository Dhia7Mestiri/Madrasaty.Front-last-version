import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajwidErrorsComponent } from './tajwid-errors.component';

describe('TajwidErrorsComponent', () => {
  let component: TajwidErrorsComponent;
  let fixture: ComponentFixture<TajwidErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TajwidErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TajwidErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
