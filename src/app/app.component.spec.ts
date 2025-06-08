import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { PrimeNGConfig } from "primeng/api";
import { TranslateModule, TranslatePipe, TranslateService, TranslateStore } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "@services/notification.service";
import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from "@angular/core";

describe('AppComponent', () => {
    const newTitle ={
        "title": "Home",
        "toggleView": true,
        "orderBy": false,
        "breadcrumb": null,
        "actionsBtn": null
    };
    let titleServiceMock = jasmine.createSpyObj('Title', ['setTitle']);
    let fixture: ComponentFixture<AppComponent>;
    let appComponent: AppComponent;
    let notif: NotificationService;
    let doc: Document;
    let primengConfig : PrimeNGConfig;
    let changeDetectorRef : ChangeDetectorRef;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports:[TranslateModule.forRoot()],
            providers: [
                NotificationService ,
                TranslateService,
                TranslateStore,
                { provide: Title, useValue: titleServiceMock },
                PrimeNGConfig, 
                TranslatePipe
            ],
            schemas:[NO_ERRORS_SCHEMA]
        }).compileComponents();
        notif = TestBed.inject(NotificationService);
        fixture = TestBed.createComponent(AppComponent);
        appComponent = fixture.componentInstance;
        changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
        doc = TestBed.inject(DOCUMENT);
        primengConfig = TestBed.inject(PrimeNGConfig);
        fixture.detectChanges(); 
        localStorage.clear();
    });
    it('should initialize ngOnInit correctly', () => {
        expect(() => appComponent.ngOnInit()).not.toThrow();
      })
    it("should set the page title correctly", () => {
        const pageTitle = 'Test Page title';
        appComponent.setTitle(pageTitle);
        titleServiceMock.setTitle(pageTitle);
        expect(appComponent.pageTitle).toEqual(pageTitle);
    });
    it("should set 'useDarkMode' property to true when darkModeChanged$ emits true",() => {
        notif.darkModeChanged$.next(true);
        appComponent.listenToDarkModeChanges();
        expect(appComponent.useDarkMode).toBe(true);
        
    });
    it("should call updatePermissions when login changes", () => {
        spyOn(appComponent,'updatePermissions');
        notif.loginStatusChanged$.next(null)
        expect(appComponent.updatePermissions).toHaveBeenCalled();
        
    });
    it("should set localStorage 'fluidUI' to 1 when fluidityChanged$ emits true", () => {
        notif.fluidityChanged$.next(true)
        expect(localStorage.getItem('fluidUI')).toBe('1');
        
    });
    it("should setTitle to the new Page when Page changes", () => {
        spyOn(appComponent,'setTitle');
        notif.updatePageTitle(newTitle);
        expect(appComponent.setTitle).toHaveBeenCalledWith(newTitle.title);
        
    });
});
