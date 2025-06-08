import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExamenComponent } from './new-examen.component';

describe('NewExamenComponent', () => {
  let component: NewExamenComponent;
  let fixture: ComponentFixture<NewExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
