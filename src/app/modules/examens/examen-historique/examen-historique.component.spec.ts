import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenHistoriqueComponent } from './examen-historique.component';

describe('ExamenHistoriqueComponent', () => {
  let component: ExamenHistoriqueComponent;
  let fixture: ComponentFixture<ExamenHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
