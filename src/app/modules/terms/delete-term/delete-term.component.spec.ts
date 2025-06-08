import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTermComponent } from './delete-term.component';

describe('DeleteTermComponent', () => {
  let component: DeleteTermComponent;
  let fixture: ComponentFixture<DeleteTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
