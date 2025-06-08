import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysListComponent } from './holidays-list.component';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HolidaysListComponent', () => {
  let component: HolidaysListComponent;
  let fixture: ComponentFixture<HolidaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysListComponent ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements and attributes
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createdd', () => {
    expect(component).toBeTruthy();
  });

 });
 