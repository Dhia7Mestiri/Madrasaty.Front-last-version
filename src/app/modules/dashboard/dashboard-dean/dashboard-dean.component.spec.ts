import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDeanComponent } from './dashboard-dean.component';

describe('DashboardDeanComponent', () => {
  let component: DashboardDeanComponent;
  let fixture: ComponentFixture<DashboardDeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
