import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExamenComponent } from './edit-examen.component';



describe('EditClassroomComponent', () => {
  let component: EditExamenComponent;
  let fixture: ComponentFixture<EditExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
