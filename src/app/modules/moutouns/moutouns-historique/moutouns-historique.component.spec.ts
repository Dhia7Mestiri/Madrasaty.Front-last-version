import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoutounsHistoriqueComponent } from './moutouns-historique.component';

describe('MoutounHistoriquesComponent', () => {
  let component: MoutounsHistoriqueComponent;
  let fixture: ComponentFixture<MoutounsHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoutounsHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoutounsHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
