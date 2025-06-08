import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLanguageDropdownComponent } from './navbar-language-dropdown.component';

describe('NavbarLanguageDropdownComponent', () => {
  let component: NavbarLanguageDropdownComponent;
  let fixture: ComponentFixture<NavbarLanguageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLanguageDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLanguageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
