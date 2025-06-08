import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDisciplineComponent } from './delete-discipline.component';

describe('DeleteDisciplineComponent', () => {
  let component: DeleteDisciplineComponent;
  let fixture: ComponentFixture<DeleteDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
