import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsComponent } from './profile-settings.component';
import { By } from '@angular/platform-browser';
import { DynamicFormComponent } from '@modules/shared/dynamic-form/dynamic-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('ProfileSettingsComponent', () => {
  let component: ProfileSettingsComponent;
  let fixture: ComponentFixture<ProfileSettingsComponent>;
  beforeEach(() => {
      TestBed.configureTestingModule({
      declarations: [ ProfileSettingsComponent , DynamicFormComponent],
      imports : [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProfileSettingsComponent);
    component = fixture.componentInstance;
    component.profileForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    });
    component.questions = [];
    fixture.detectChanges();
  });

  it('should be created succesfully', () => {
    expect(component).toBeTruthy();
  });
  it('should Emit onClick', () => {
    spyOn(component.BtnUpdateClick, 'emit');
    component.onUpdateClick();    
    expect(component.BtnUpdateClick.emit).toHaveBeenCalled();
  });
  it('should contain "Profile" in the card title', () => {
    const cardTitleElement = fixture.debugElement.query(By.css('.card-title h2'));
    expect(cardTitleElement.nativeElement.textContent).toContain('Profile');
  });

  it('should pass the profileForm and questions inputs to the app-dynamic-form component', () => {
    const dynamicFormElement = fixture.debugElement.query(By.directive(DynamicFormComponent));
    const dynamicFormComponent = dynamicFormElement.componentInstance as DynamicFormComponent;
    expect(dynamicFormComponent.form).toBe(component.profileForm);
    expect(dynamicFormComponent.questions).toBe(component.questions);
  });;
});
