import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MemberDetailsComponent } from './member-details.component';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';

describe('MemberDetailsComponent', () => {

  
    let component: MemberDetailsComponent;
    let fixture: ComponentFixture<MemberDetailsComponent>;
    let httpService: jasmine.SpyObj<HttpService>; 

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MemberDetailsComponent ],
            providers: [
                { provide: HttpService, useValue: httpService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ Id: '1' }),
                        snapshot: {
                            paramMap: {
                                get: (key) => {
                                    return '1';
                                }
                            }
                        }
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>; // Cast to SpyObj<HttpService>
        // route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call read method from the http service', () => {
        expect(httpService.read).toHaveBeenCalledWith("assets/files/countries.json",false);
        expect(httpService.read).toHaveBeenCalledWith(consts.API_URL + "Members/" + '1', false);
    });

    it('should set the currentmember and contries properties', () => {
        const testData = { name: 'John Doe',Country: 'US', Female: true};
        (httpService.read as jasmine.Spy).and.returnValue(of(testData));
        (httpService.read as jasmine.Spy).and.returnValue(of([{ code: 'US', name: 'United States' }]));

    it('should set the currentmember and contries properties', () => {
          const testData = { name: 'John Doe',Country: 'US', Female: true};
          (httpService.read as jasmine.Spy).and.returnValue(of(testData));
          (httpService.read as jasmine.Spy).and.returnValue(of([{ code: 'US', name: 'United States' }]));
  
          fixture.detectChanges();
          expect(component.currentmember).toEqual({ name: 'John Doe',Country: 'United States', Female: 'Masculin'});
          expect(component.contries).toEqual([{ code: 'US', name: 'United States' }]);
      });
  
      it('should call getCountryName method and return country name', () => {
          component.contries = [{ code: 'US', name: 'United States' }];
          const countryName = component.getCountryName('US');
          expect(countryName).toEqual('United States');
      });
  
      it('should call getGenderName method and return gender name', () => {
          component.genders = [{ isFemale: false, name: 'Masculin' }, { isFemale: true, name: 'Féminin' }];
          const genderName = component.getGenderName(false);
          expect(genderName).toEqual('Masculin');
      });
  })
});