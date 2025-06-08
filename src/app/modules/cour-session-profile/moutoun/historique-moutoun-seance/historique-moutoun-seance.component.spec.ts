import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMoutounSeanceComponent } from './historique-moutoun-seance.component';

describe('HistoriqueMoutounSeanceComponent', () => {
  let component: HistoriqueMoutounSeanceComponent;
  let fixture: ComponentFixture<HistoriqueMoutounSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueMoutounSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueMoutounSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
