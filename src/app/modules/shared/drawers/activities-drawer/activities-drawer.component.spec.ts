import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDrawerComponent } from './activities-drawer.component';

describe('ActivitiesDrawerComponent', () => {
  let component: ActivitiesDrawerComponent;
  let fixture: ComponentFixture<ActivitiesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
