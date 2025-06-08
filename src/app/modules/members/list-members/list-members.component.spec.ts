import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembersComponent } from './list-members.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ColumnsService } from '@services/columns/columns.service';
import { NotificationService } from '@services/notification.service';
import { NotificationService as NT } from '@services/notification/notification.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { Router } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { EditMemberStubComponent } from '../edit-member-stub';
import { SaveButtonAction } from '@enums/save-button-action';
import { CardViewStubComponent } from '@modules/classrooms/card-view.component-stub';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ListMembersComponent', () => {
  let component: ListMembersComponent;
  let fixture: ComponentFixture<ListMembersComponent>;
  let notif : NotificationService; 
  let cardViewComponent: DebugElement;
  let permissionMock = jasmine.createSpyObj('PermissionsService',['allowedTo']);
  let uiNotificationMock = jasmine.createSpyObj('NT',['deleteElementAlert'])
  let router: Router;
   const sentObj = {
    button: SaveButtonAction.Delete,
    item:
    {
    "SchoolId": 1,
    "Status": 0,
    "State": 0,
    "Login": null,
    "FirstName": "Oussama",
    "LastName": "Peters",
    "Female": false,
    "SkypeId": "Oussama.Peters",
    "ParentEmail": "admin@admin",
    "BirthDate": "1998-07-05T17:27:44.577",
    "Photo": null,
    "Street": "487 Rue de Tanger",
    "ZipCode": "747934",
    "City": "London",
    "PhoneNumber": "(162) 831-7515",
    "Country": "USA",
    "CreatedOn": "2020-06-05T17:27:44.577",
    "FullName": "Oussama Peters",
    "Id": 2,
    "Email": "Oussama@Peters.com"
    },
    itemId:2
   }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMembersComponent,EditMemberStubComponent ,CardViewStubComponent],
      imports :[SharedModule,RouterTestingModule.withRoutes([]),TranslateModule.forRoot(),HttpClientTestingModule],
      providers : [
        ColumnsService,
        TranslateService,
        TranslatePipe,
        {provide : NT,usevalue : uiNotificationMock } ,
        {provide : PermissionsService, usevalue : permissionMock},
        
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ListMembersComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    notif = TestBed.inject(NotificationService);
    fixture.detectChanges();
   
  });
  it('should call "getcaptions" when language changes',()=>{
    spyOn(component,'getCaptions');
    notif.updateLanguage('en');
    expect(component.getCaptions).toHaveBeenCalled()
  })
  it('should delete a Member when clicking "delete Member"', () => {
    spyOn(component, 'deleteMember');
    component.buttonClicked(sentObj);
    expect(component.deleteMember).toHaveBeenCalledWith(2);
  });
  it('should call the openModal method of the editMemberComponent when clicking on "Add Member"', () => {
    const stubbedEditComponent = fixture.componentInstance.editMemberCmp;
    spyOn(stubbedEditComponent, 'openModal');
    component.AddMember();
    expect(stubbedEditComponent.openModal).toHaveBeenCalledWith(SaveButtonAction.New);
  })
  it('should call buttonClicked method when btnClicked event is emitted', () => {
    spyOn(component, 'buttonClicked')
    cardViewComponent = fixture.debugElement.query(By.directive(CardViewStubComponent));
    cardViewComponent.componentInstance.btnClicked.emit(sentObj);
    expect(component.buttonClicked).toHaveBeenCalledWith(sentObj);

  })
});
