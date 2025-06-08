import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should return False and route to "auth/login" when currentUser is null in localStorage', () => {
    spyOn(localStorage, 'getItem').withArgs('currentUser').and.returnValue(null);   
    const canActivate = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/dashboard' } as RouterStateSnapshot );
    expect(canActivate).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']); 
  })
  it('should route to return True when currentUser is not null in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue("baha"); 
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result = guard.canActivate(route, state);
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  })
})
