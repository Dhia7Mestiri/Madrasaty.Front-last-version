import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMoutounComponent } from './delete-moutoun.component';

describe('DeleteMoutounComponent', () => {
  let component: DeleteMoutounComponent;
  let fixture: ComponentFixture<DeleteMoutounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMoutounComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMoutounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
