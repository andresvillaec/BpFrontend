import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ApiUrl } from '../../../../../environments/environments';
import { Product } from "../models/product.model";
import { HttpGenericService } from "../../../core/services/http-generic.service";

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpGenericService: HttpGenericService<Product>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Product Description',
    logo: 'logo.png',
    date_release: new Date(2025, 10, 28),
    date_revision: new Date(2026, 10, 28),
  };
  const apiUrl = ApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, HttpGenericService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpGenericService = TestBed.inject(HttpGenericService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', (done) => {
    const mockResponse = { data: [mockProduct] };

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(mockProduct);
      done();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get product by id', (done) => {
    service.getProductById(mockProduct.id).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${mockProduct.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should create a product', (done) => {
    service.createProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should update a product', (done) => {
    service.updateProduct(mockProduct.id, mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });
});
