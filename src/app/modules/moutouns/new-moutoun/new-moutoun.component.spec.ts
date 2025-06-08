import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoutounComponent } from './new-moutoun.component';

describe('NewMoutounComponent', () => {
  let component: NewMoutounComponent;
  let fixture: ComponentFixture<NewMoutounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMoutounComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMoutounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
