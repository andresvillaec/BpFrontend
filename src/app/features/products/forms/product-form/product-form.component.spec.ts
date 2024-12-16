import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let formBuilder: FormBuilder;
  let testFormGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);

    testFormGroup = formBuilder.group({
      id: [''],
      logo: [''],
      name: [''],
      description: [''],
      date_release: [''],
      date_revision: [''],
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;

    component.productForm = testFormGroup;
    component.isEditMode = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with the appropriate controls', () => {
    const idInput = fixture.debugElement.query(By.css('input[formControlName="id"]'));
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));

    expect(idInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
  });

  it('should emit the formSubmit event on submit', () => {
    spyOn(component.formSubmit, 'emit'); // Spy on the event emitter

    // Trigger form submission
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    expect(component.formSubmit.emit).toHaveBeenCalled(); // Check if the event was emitted
  });

  it('should emit the formReset event on reset', () => {
    spyOn(component.formReset, 'emit'); // Spy on the event emitter

    // Trigger the reset button click
    const resetButton = fixture.debugElement.query(By.css('button.btn-cancel'));
    resetButton.triggerEventHandler('click', null);

    expect(component.formReset.emit).toHaveBeenCalled(); // Check if the event was emitted
  });
});