import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesListComponent } from './disciplines-list.component';

describe('DisciplinesListComponent', () => {
  let component: DisciplinesListComponent;
  let fixture: ComponentFixture<DisciplinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
