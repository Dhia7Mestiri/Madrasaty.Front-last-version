import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoutounComponent } from './moutoun.component';

describe('MoutounComponent', () => {
  let component: MoutounComponent;
  let fixture: ComponentFixture<MoutounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoutounComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoutounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
