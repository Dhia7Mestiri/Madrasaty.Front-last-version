import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenProfileComponent } from './examen-profile.component';

describe('ExamenProfileComponent', () => {
  let component: ExamenProfileComponent;
  let fixture: ComponentFixture<ExamenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
