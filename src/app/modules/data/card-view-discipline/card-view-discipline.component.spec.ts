import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewDisciplineComponent } from './card-view-discipline.component';

describe('CardViewDisciplineComponent', () => {
  let component: CardViewDisciplineComponent;
  let fixture: ComponentFixture<CardViewDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
