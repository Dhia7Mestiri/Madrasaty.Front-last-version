import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiHistoriquesComponent } from './tasmii-historiques.component';

describe('TasmiiHistoriquesComponent', () => {
  let component: TasmiiHistoriquesComponent;
  let fixture: ComponentFixture<TasmiiHistoriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasmiiHistoriquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasmiiHistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
