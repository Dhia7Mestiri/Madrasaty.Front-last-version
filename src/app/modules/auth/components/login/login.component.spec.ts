import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { RouterTestingModule } from "@angular/router/testing"
import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { SharedModule } from "@modules/shared/shared.module"
import { NotificationService } from '@services/notification/notification.service';
import { UserService } from "@services/user.service"
import { of } from "rxjs"

describe("loginComponent",()=>{
    let loginFixture : ComponentFixture<LoginComponent> ;
    let notificationSpy = jasmine.createSpyObj('NotificationService',['showSuccess']);
    let login : LoginComponent 
    let userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUserToken', 'setUserLoggedIn','getMemberId']);
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations : [LoginComponent],
            providers :  [FormBuilder,{provide : NotificationService , UseValue : notificationSpy },
            { provide: UserService, useValue: userServiceSpyObj }],
            imports : [RouterTestingModule.withRoutes([]),SharedModule,ReactiveFormsModule]
        }).compileComponents()
        loginFixture = TestBed.createComponent(LoginComponent) ; 
        login = loginFixture.componentInstance
        loginFixture.detectChanges()

    })
    it('should be created', () => {
        expect(login).toBeTruthy();
      });
      it('should be invalid when formValue is invalid', () => {
        login.loginForm.setValue({
          "email": "invalidemail", 
          "password": "", 
        });
        expect(login.loginForm.valid).toEqual(false);
      });
      it('should call loginUser when formValue is valid', () => {
        userServiceSpyObj.getUserToken.and.returnValue(of([]));
        login.loginForm.setValue({
          "email": "baha.mestiri@gmail.com", 
          "password": "testtestt", 
        });
        const formElement: HTMLFormElement = loginFixture.nativeElement.querySelector('#kt_login_signin_form');
        formElement.dispatchEvent(new Event('submit'));
        loginFixture.detectChanges();
        expect(userServiceSpyObj.getUserToken).toHaveBeenCalled();
      }) ;

  
})