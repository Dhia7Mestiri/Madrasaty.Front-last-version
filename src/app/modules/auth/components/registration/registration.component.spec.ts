
import { SharedModule } from "@modules/shared/shared.module";
import { RegistrationComponent } from "./registration.component"
import { ComponentFixture , TestBed } from "@angular/core/testing"
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "@services/register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "@services/notification.service";
import { RouterTestingModule } from "@angular/router/testing";
describe('RegistrationComponent',()=>{
    let activatedRoute : ActivatedRoute
    const functionsArray = [
        'getCountries',
        'getSchools',
        'getMemberStatus',
        'getAdmins',
        'RegisterUser'
      ];
      activatedRoute = {
        snapshot: {
          paramMap: {
            get: (param: string) => 'mockedValue' // Mocking parameter values as needed
          }
        }
      } as any;
    let registration : RegistrationComponent ; 
    let fixture : ComponentFixture<RegistrationComponent> ;
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let notificationSpy = jasmine.createSpyObj('NotificationService',['showSuccess']);
   // let RegisterSpy = jasmine.createSpyObj('RegisterService',functionsArray);


    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations : [RegistrationComponent],
            imports :  [SharedModule,ReactiveFormsModule,RouterTestingModule.withRoutes([])],
            providers: [FormBuilder,RegisterService,
                //{ provide: Router, useValue: routerSpy },
                { provide: NotificationService, useValue: notificationSpy },
             //   { provide: RegisterService, useValue: RegisterSpy },
               // { provide: ActivatedRoute, useValue: activatedRoute }

            ]

        }).compileComponents()
        fixture = TestBed.createComponent(RegistrationComponent) ;
        registration = fixture.componentInstance ; 
        fixture.detectChanges() ; 
    })
    it('should be created', () => {
        expect(registration).toBeTruthy();
      });
      it('should be invalid when formValue is invalid', () => {
        registration.registerform.setValue({
          "BirthDate": "", 
          "Email": "invalidemail", 
          "SchoolId": "",
          "ConfirmPassword": "", 
          "Password": "", 
        });
    
        expect(registration.registerform.valid).toEqual(false);
      });
      it('should be valid when formValue is valid', () => {
        const specificDate = new Date('2022-01-01');
        registration.registerform.setValue({
          "BirthDate": specificDate, 
          "Email": "baha.mestiri@gmail.com", 
          "SchoolId": "1",
          "ConfirmPassword": "bahabaha", 
          "Password": "bahabaha", 
        });
    
        expect(registration.registerform.valid).toEqual(true);
      });

})