import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCreateComponent } from '../product-create/product-create.component';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from "../services/product.service";

describe('ProductEditComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['updateProduct']);

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

  it('dateReleaseValidator should invalidate past dates', () => {
    const pastDate = new Date(2000, 0, 1).toISOString().split('T')[0]; // Use ISO string from date input
    const control = { value: pastDate };

    const result = component.dateReleaseValidator()(control);

    expect(result).toEqual({ pastDate: true }); // Invalid
  });
});
