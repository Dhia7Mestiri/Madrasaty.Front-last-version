import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberComponent } from './edit-member.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { QuestionService } from '@services/questions/question.service';
import { QuestionControlService } from '@services/questions/question-control.service';
import { SaveButtonAction } from '@enums/save-button-action';

describe('EditMemberComponent', () => {
  let component: EditMemberComponent;
  let fixture: ComponentFixture<EditMemberComponent>;
  let PermissionsServiceSpy =  jasmine.createSpyObj('PermissionsService',['allowedTo']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberComponent ],
      imports : [RouterTestingModule.withRoutes([]),SharedModule,HttpClientTestingModule],
      providers : [
        {provide : PermissionsService, useValue : PermissionsServiceSpy },
        NotificationService,
        QuestionService,
        QuestionControlService,

      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 it('should be Initialized properly',()=>{
    expect(component).toBeTruthy();
 });
  it('should call "newMember" method when clicking on "Edit Member" and action is "new"', () => {
    spyOn(component,'newMember');
    component.openModal(SaveButtonAction.New);
    expect(component.newMember).toHaveBeenCalled();
  });
  it('should not call "newMember" method when clicking on "Edit Member" and action is "Edit"', () => {
    spyOn(component,'newMember');
    component.openModal(SaveButtonAction.Edit);
    expect(component.newMember).not.toHaveBeenCalled();
  });
});
