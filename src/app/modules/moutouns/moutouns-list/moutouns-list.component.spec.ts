import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoutounsListComponent } from './moutouns-list.component';

describe('MoutounsListComponent', () => {
  let component: MoutounsListComponent;
  let fixture: ComponentFixture<MoutounsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoutounsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoutounsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
