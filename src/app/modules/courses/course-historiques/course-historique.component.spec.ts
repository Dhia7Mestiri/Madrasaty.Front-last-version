import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHistoriqueComponent } from './course-historique.component';

describe('CourseHistoriqueComponent', () => {
  let component: CourseHistoriqueComponent;
  let fixture: ComponentFixture<CourseHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
