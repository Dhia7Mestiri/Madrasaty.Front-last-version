import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '@services/notification.service';
import { EditClassroomComponent } from './edit-classroom.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { QuestionControlService } from '@services/questions/question-control.service';
import { QuestionService } from '@services/questions/question.service';
import { SaveButtonAction } from '@enums/save-button-action';

describe('EditClassroomComponent', () => {
  let component: EditClassroomComponent;
  let fixture: ComponentFixture<EditClassroomComponent>;
  let PermissionsServiceSpy =  jasmine.createSpyObj('PermissionsService',['allowedTo']);
  let NotificationServiceSpy = jasmine.createSpyObj('NotificationService',['modalSaveBtnClicked$'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClassroomComponent ],
      imports : [RouterTestingModule.withRoutes([]),SharedModule,HttpClientTestingModule],
      providers : [
        {provide : PermissionsService, useValue : PermissionsServiceSpy },
        {provide : NotificationService, useValue : NotificationServiceSpy},
        QuestionService,
        QuestionControlService,

      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EditClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 it('should be Initialized properly',()=>{
    expect(component).toBeTruthy();
 });
  it('should call "newClassroom" method when clicking on "Edit Classroom" and action is "new"', () => {
    spyOn(component,'newClassroom');
    component.openModal(SaveButtonAction.New);
    expect(component.newClassroom).toHaveBeenCalled();
  });
  it('should not call "newClassroom" method when clicking on "Edit Classroom" and action is "Edit"', () => {
    spyOn(component,'newClassroom');
    component.openModal(SaveButtonAction.Edit);
    expect(component.newClassroom).not.toHaveBeenCalled();
  });
});
