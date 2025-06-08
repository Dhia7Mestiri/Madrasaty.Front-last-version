import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreDrawerComponent } from './explore-drawer.component';

describe('ExploreDrawerComponent', () => {
  let component: ExploreDrawerComponent;
  let fixture: ComponentFixture<ExploreDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
