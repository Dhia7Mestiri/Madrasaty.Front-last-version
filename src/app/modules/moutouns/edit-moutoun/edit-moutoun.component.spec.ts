import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoutounComponent } from './edit-moutoun.component';

describe('EditMoutounComponent', () => {
  let component: EditMoutounComponent;
  let fixture: ComponentFixture<EditMoutounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMoutounComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMoutounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
