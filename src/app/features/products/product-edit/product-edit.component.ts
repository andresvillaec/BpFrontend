import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model"; 4

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  productForm!: FormGroup;
  today = new Date();
  productId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';  // Retrieve product ID from route
    this.initializeForm();
    this.loadProductForEdit(); // Load product and populate the form
  }

  // Initialize the form with validation rules
  initializeForm() {
    this.productForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      logo: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      date_release: ['', [Validators.required, this.dateReleaseValidator()]],
      date_revision: ['', [Validators.required, this.dateRevisionValidator()]]
    });
  }

  isFieldInvalid(field: string): boolean {
    return !!(this.productForm.get(field)?.invalid && this.productForm.get(field)?.touched);
  }

  dateReleaseValidator() {
    return (control: any) => {
      const selected = new Date(control.value);

      // Reset time to midnight (00:00) on both selected and today's dates to compare just the dates.
      const today = new Date();
      today.setHours(0, 0, 0, 0);     // Set today’s time to 00:00:00 for comparison
      selected.setHours(0, 0, 0, 0);  // Set the selected time to 00:00:00 for comparison

      // If the selected date is today or a future date, it is valid.
      return selected >= today ? null : { pastDate: true };
    };
  }

  dateRevisionValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const releaseDate = new Date(this.productForm?.get('date_release')?.value);
      const nextYear = releaseDate.setFullYear(releaseDate.getFullYear() + 1);
      return selectedDate.getTime() === nextYear ? null : { notNextYear: true };
    };
  }

  loadProductForEdit(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product: Product) => {
          // Populate the form with the product's existing data
          this.productForm.patchValue({
            id: product.id,
            logo: product.logo,
            name: product.name,
            description: product.description,
            date_release: product.date_release,
            date_revision: product.date_revision,
          });
        },
        error: (err) => {
          console.error('Error loading product:', err);
          alert('Error loading product details.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        id: this.productId, // ID is not being edited
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        logo: this.productForm.value.logo,
        date_release: this.productForm.value.date_release,
        date_revision: this.productForm.value.date_revision
      };

      // Call the service to update the product
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/']);  // Redirect to the product list or another relevant page
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Failed to update product.');
        }
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
