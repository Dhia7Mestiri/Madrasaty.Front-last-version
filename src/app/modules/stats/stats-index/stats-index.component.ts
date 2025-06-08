import { Component, OnInit      } from '@angular/core';
import { FormGroup              } from '@angular/forms';

import { QuestionBase           } from '@services/questions/question-base';
import { QuestionService        } from '@services/questions/question.service';
import { QuestionControlService } from '@services/questions/question-control.service';
import { PermissionsService     } from '@services/permissions-service/permissions.service';
import { Permission             } from '@enums/permission';
import { NotificationService    } from '@services/notification.service';

@Component({
    selector   : 'app-stats-index',
    templateUrl: './stats-index.component.html',
    styleUrls  : ['./stats-index.component.scss']
})
export class StatsIndexComponent implements OnInit
{
    questions: QuestionBase<any>[] = [];
    form     = new FormGroup({});

    pageTitle        = 'Statistiques';
    canEditClassroom = false;

    constructor(private questionCtrl: QuestionControlService, private qService: QuestionService,
        private notif: NotificationService, private perm: PermissionsService)
    { }

    ngOnInit()
    {
        this.notif.updatePageTitle({
            title: this.pageTitle,
            toggleView: true,
            orderBy: true,
            breadcrumb: [
                { text: this.pageTitle, url: '/stats' },
            ],
            // actionsBtn: [
            //     {
            //         text: 'Nouveau Cours',
            //         url: '/courses/new',
            //         modalTarget: 'newCourse',
            //         cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
            //     },
            // ]
        });

        this.canEditClassroom = this.perm.allowedTo([Permission.EditClassroom]);

        this.questions = this.qService.newClientAccountQuestions(false);  // , this.client);
        this.form      = this.questionCtrl.toFormGroup(this.questions);
    }
}