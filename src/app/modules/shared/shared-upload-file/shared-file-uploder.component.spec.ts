import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileUploderComponent } from './shared-file-uploder.component';

describe('SharedFileUploderComponent', () => {
  let component: SharedFileUploderComponent;
  let fixture: ComponentFixture<SharedFileUploderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFileUploderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFileUploderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
