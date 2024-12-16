import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from "../services/product.service";

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['createProduct']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: ProductService, useValue: productServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngInit', () => {
    const spyinitializeForm = spyOn(component, 'initializeForm');
    component.ngOnInit();
    expect(spyinitializeForm).toHaveBeenCalledOnceWith();
  });

  it('should call initializeForm to create productForm', () => {
    component.initializeForm();
    expect(component.productForm).toBeDefined();
  });

  it('dateReleaseValidator should validate correctly for valid dates', () => {
    const today = new Date();
    const validDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const control = { value: validDate.toISOString().split('T')[0] }; // Use ISO string from date input

    const result = component.dateReleaseValidator()(control);

    expect(result).toBeNull(); // Valid
  });
});
