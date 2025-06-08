import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '@services/user.service';
import { SharedModule } from '../shared.module';
import { NotificationService } from '@services/notification.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from '@interfaces/user';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userServiceSpy = jasmine.createSpyObj<UserService>(['logOut','UserLoggedIn']);
  let notificationServiceMock: Partial<NotificationService>;
  let mockObservable = ({

    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe",
    "email": "johndoe@example.com",
    "role": "admin"
  }
  )
  let router: Router;
  let loginStatusChangedSubject: Subject<any>;

  beforeEach(async () => {
    loginStatusChangedSubject = new Subject<IUser | null>();
    notificationServiceMock = {
      loginStatusChanged$: loginStatusChangedSubject
    };
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes([]), SharedModule],
      providers: [{ provide: UserService, useValue: userServiceSpy },
      { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('should show only "Guest" when we are not signingIn', () => {
    component.userName = null;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Guest')
  })
  it('should show User loggedIn details when we signIn', () => {
    notificationServiceMock.loginStatusChanged$.next(mockObservable)
    fixture.detectChanges();
    expect(component.userName).toBe('johndoe');
    expect(component.email).toBe('johndoe@example.com');
  })
  it('should route to Auth Login when we logOut', () => {
    spyOn(router, 'navigate');
    notificationServiceMock.loginStatusChanged$.next(null)
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  })
});
