import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewMasonryComponent } from './card-view-masonry.component';

describe('CardViewMasonryComponent', () => {
  let component: CardViewMasonryComponent;
  let fixture: ComponentFixture<CardViewMasonryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewMasonryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
