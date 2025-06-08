import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideFooterComponent } from './aside-footer.component';

describe('AsideFooterComponent', () => {
  let component: AsideFooterComponent;
  let fixture: ComponentFixture<AsideFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
