import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabslistComponent } from './tabs-list.component';

describe('TablistComponent', () => {
  let component: TabslistComponent;
  let fixture: ComponentFixture<TabslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
