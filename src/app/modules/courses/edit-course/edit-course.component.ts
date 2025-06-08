import { Component, Input, OnInit } from '@angular/core';
import { FormGroup                } from '@angular/forms';
import { Subscription             } from 'rxjs';

import { PermissionsService       } from '@services/permissions-service/permissions.service';
import { QuestionBase             } from '@services/questions/question-base';
import { QuestionControlService   } from '@services/questions/question-control.service';
import { QuestionService          } from '@services/questions/question.service';
import { NotificationService      } from '@services/notification.service';
import { Course                   } from '@models/course';
import { Permission               } from '@enums/permission';
import { Page                     } from '@enums/page';
import { SaveButtonAction         } from '@enums/save-button-action';
import { ISaveButtonData          } from '@interfaces/save-button-data';

@Component({
    selector   : 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls  : ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit
{
    @Input() course !: Course;
    permissions = [Permission.EditCourse];

    questions: QuestionBase<any>[] = [];
    form     = new FormGroup({});
    subscription !: Subscription;

    constructor(private questionCtrl: QuestionControlService, private qService: QuestionService,
        private perm: PermissionsService, private notif: NotificationService)
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.listenToSaveButtonClick();
    }

    private grantedAccess() : boolean
    {
        return this.perm.allowedTo(this.permissions);
    }

    edit(course: Course)
    {
        this.course    = course;
        this.questions = this.qService.editCourseQuestions(this.course);
        this.form      = this.questionCtrl.toFormGroup(this.questions);
    }

    listenToSaveButtonClick()
    {
        // Update UI if/when role's users list is modified
   
        this.subscription = this.notif.modalSaveBtnClicked$.subscribe((buttonData: ISaveButtonData) =>
        {
            console.log(  this.form  .value)
            if (buttonData.page == Page.Courses && buttonData.action == SaveButtonAction.Edit)
            {
                // TODO: Call backend to modify Course
                // this.httpService.put(this.form);
              
            }
        });
    }
}