import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from "../models/product.model";
import { HttpGenericService } from "../../../core/services/http-generic.service";
import { ApiUrl } from "../../../../../environments/environments";

@Injectable({
  providedIn: 'root'  // Ensure this service is available globally
})
export class ProductService {
  private apiUrl = ApiUrl;  // API endpoint

  constructor(private httpGenericService: HttpGenericService<Product>) {} 

  getProducts(): Observable<Product[]> {
    return this.httpGenericService.getAll<{ data: Product[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }
  getProductById(id: string): Observable<Product> {
    return this.httpGenericService.getById(this.apiUrl, id);
  }
  createProduct(product: Product): Observable<Product> {
    return this.httpGenericService.create(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.httpGenericService.update(this.apiUrl, id, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpGenericService.delete(this.apiUrl, id);
  }
}