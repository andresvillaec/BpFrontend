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
});
