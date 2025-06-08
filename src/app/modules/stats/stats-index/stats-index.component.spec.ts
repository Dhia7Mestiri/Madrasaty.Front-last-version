import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsIndexComponent } from './stats-index.component';

describe('StatsIndexComponent', () => {
  let component: StatsIndexComponent;
  let fixture: ComponentFixture<StatsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
