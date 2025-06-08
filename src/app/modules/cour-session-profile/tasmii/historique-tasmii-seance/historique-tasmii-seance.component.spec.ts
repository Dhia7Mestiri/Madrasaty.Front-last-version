import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueTasmiiSeanceComponent } from './historique-tasmii-seance.component';

describe('HistoriqueTasmiiSeanceComponent', () => {
  let component: HistoriqueTasmiiSeanceComponent;
  let fixture: ComponentFixture<HistoriqueTasmiiSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueTasmiiSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueTasmiiSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
