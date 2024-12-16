import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { ProductListComponent } from './product-list.component';
import { SearchListService } from "../../../shared/services/search-list.service";
import { ProductService } from "../services/product.service";

import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let searchListServiceSpy: jasmine.SpyObj<SearchListService>;

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    const searchSpy = jasmine.createSpyObj('SearchListService', ['filterList']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productSpy },
        { provide: SearchListService, useValue: searchSpy },
        provideRouter([]), // Provide routing dependencies
        {
          provide: ActivatedRoute, // Mock ActivatedRoute with example data
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    // Inject the service spies into the component
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    searchListServiceSpy = TestBed.inject(SearchListService) as jasmine.SpyObj<SearchListService>;
    productServiceSpy.getProducts.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
