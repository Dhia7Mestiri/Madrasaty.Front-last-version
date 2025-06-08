import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolsListComponent } from './schools-list.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NotificationService as NT } from '@services/notification/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@services/notification.service';
import { ColumnsService } from '@services/columns/columns.service';
import { By } from '@angular/platform-browser';
import { CardViewComponent } from '@modules/data/card-view/card-view.component';
import {
  ConfirmationService,
  MessageService
} from 'primeng/api';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateStore
} from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SaveButtonAction } from '@enums/save-button-action';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { School } from '@models/school';
import { SharedModule } from '@modules/shared/shared.module';

/*describe('SchoolsListComponent', () => {
  let component: SchoolsListComponent;
  let fixture: ComponentFixture<SchoolsListComponent>;
  let ButtonClick = { itemId: 1, button : SaveButtonAction.Delete }
  const item: School = {
    Id: 1,
    Name: 'Example School',
    Street: '123 Main St',
    ZipCode: '12345',
    City: 'Example City',
    Country: 'Example Country',
    Siret: '1234567890',
    CodeTVA: 'ABC123',
    Photo: 'example-photo.jpg',
  };

  let EditClick = { item, itemId: 2, buttontitle: 'Edit' }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolsListComponent, CardViewComponent, EditSchoolComponent],
      imports: [HttpClientModule,SharedModule, TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
      // providers: [PermissionsService, TranslateService, NT,
      //   NotificationService, ColumnsService, MessageService, ConfirmationService, TranslateStore,
      //   TranslateCompiler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(SchoolsListComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call deleteSchool method with correct argument when buttonType is \'Delete\ ', () => {
    spyOn(component, 'deleteSchool');

    component.buttonClicked(ButtonClick)
    expect(component.deleteSchool).toHaveBeenCalledWith(ButtonClick.itemId);
  });
  it("should open edit dialog with correct school data when clicking on edit button in the cardview", () => {
    spyOn(component.editSchoolCmp, 'AddEdit');
    component.buttonClicked(EditClick)
    expect(component.editSchoolCmp.AddEdit).toHaveBeenCalledWith(item);

  })
});*/
