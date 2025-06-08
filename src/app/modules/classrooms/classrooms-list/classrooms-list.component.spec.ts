import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '@services/notification.service';
import { NotificationService as NT } from '@services/notification/notification.service';
import { ClassroomsListComponent } from './classrooms-list.component';
import { SharedModule } from '@modules/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ColumnsService } from '@services/columns/columns.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { Router } from '@angular/router';
import { EditClassroomStubComponent } from '../edit-classroom-stub';
import { By } from '@angular/platform-browser';
import { SaveButtonAction } from '@enums/save-button-action';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { CardViewStubComponent } from '../card-view.component-stub';

describe('ClassroomsListComponent', () => {
  let component: ClassroomsListComponent;
  let fixture: ComponentFixture<ClassroomsListComponent>;
  let translateService: TranslateService;
  let cardViewComponent: DebugElement;
  let router: Router;
  let PermissionsServiceSpy = jasmine.createSpyObj('PermissionsService', ['allowedTo']);
  let NTSpy = jasmine.createSpyObj('NotificationService', ['deleteElementAlert', 'showSuccess', 'showError']);
  let sentObj =
  {
    button: SaveButtonAction.Delete,
    item: { Id: 2, Name: "test", NumberChair: 6, NumberDesk: 14, NumberProjector: 15, SchoolId: 1 },
    itemId: 2
  }
  const httpSpy = jasmine.createSpyObj('HttpClient', ['delete', 'get']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomsListComponent, EditClassroomStubComponent, CardViewStubComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]), TranslateModule.forRoot()],
      providers: [{ provide: HttpClient, useValue: httpSpy },
        NotificationService,
      { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      { provide: NT, useValue: NTSpy },
        ColumnsService,
        TranslateService,
        TranslatePipe,
      { provide: PermissionsService, useValue: PermissionsServiceSpy }]

    })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClassroomsListComponent);
    component = fixture.componentInstance;
    translateService = fixture.debugElement.injector.get(TranslateService);
    fixture.detectChanges();

  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit methods', () => {
    PermissionsServiceSpy.allowedTo.and.returnValue(true);
    spyOn(component, 'getCaptions');
    spyOn(component, 'listenToChanges');
    spyOn(component, 'listenToViewChanges');
    spyOn(component, 'listenToLanguageChanges');
    component.ngOnInit();
    expect(component.getCaptions).toHaveBeenCalled();
    expect(component.listenToChanges).toHaveBeenCalled();
  });
  it('should navigate to home page if access not granted', () => {
    PermissionsServiceSpy.allowedTo.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
  it('should delete a classroom when clicking "delete Classroom"', () => {
    spyOn(component, 'deleteItem');
    component.buttonClicked(sentObj);
    expect(component.deleteItem).toHaveBeenCalledWith(2);
  });
  it('should call the openModal method of the editClassroomComponent when clicking on Add Classroom', () => {
    spyOn(translateService, 'getDefaultLang').and.returnValue('en');
    component.captions = [{
      "classrooms-list.new-button": 'New'
    }];
    const stubbedEditComponent = fixture.componentInstance.editClassroomCmp;
    spyOn(stubbedEditComponent, 'openModal');
    component.AddClassroom();
    expect(stubbedEditComponent.openModal).toHaveBeenCalledWith(SaveButtonAction.New);
  })
  it('should call buttonClicked method when btnClicked event is emitted', () => {
    spyOn(component, 'buttonClicked')
    cardViewComponent = fixture.debugElement.query(By.directive(CardViewStubComponent));
    cardViewComponent.componentInstance.btnClicked.emit(sentObj);
    expect(component.buttonClicked).toHaveBeenCalledWith(sentObj);

  })
});

