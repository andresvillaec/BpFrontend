import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from "../models/product.model";
import { FormsModule } from '@angular/forms';
import { SearchListService } from "../../../shared/services/search-list.service";
import { ProductService } from "../services/product.service";
import { RouterLink, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  searchTerm: string = '';
  limit: number = 5;
  products: Product[] = [];
  errorMessage: string = ''; // Holds error messages
  productIdToDelete?: string;
  productNameToDelete?: string;
  showDeletePopup: boolean = false;

  constructor(
    private searchListService: SearchListService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;  // Assigning fetched data to products array
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.errorMessage = 'Error loading products';  // Handle errors
      }
    });
  }

  // Trigger delete flow - show the delete confirmation popup
  deleteProduct(productId: string, productName: string): void {
  }

  // Confirm the product deletion
  confirmDelete(): void {
    if (this.productIdToDelete) {
      this.productService.deleteProduct(this.productIdToDelete).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.showDeletePopup = false;  // Hide the popup after deletion
          this.loadProducts();  // Reload the product list after deletion
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product.');
        }
      });
    }
  }

  // Cancel the delete operation and hide the popup
  cancelDelete(): void {
    this.showDeletePopup = false;
  }

  // Function to filter products based on search term
  get filteredProducts(): Product[] {
    return this.searchListService
      .filterList(this.products, this.searchTerm)
      .slice(0, this.limit);
  }
}