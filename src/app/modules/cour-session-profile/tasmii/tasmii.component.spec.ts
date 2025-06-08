import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiComponent } from './tasmii.component';

describe('TasmiiComponent', () => {
  let component: TasmiiComponent;
  let fixture: ComponentFixture<TasmiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasmiiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasmiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
