import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ProductFormComponent } from "../forms/product-form/product-form.component";

@Component({
  selector: 'app-product-edit',
  imports: [ProductFormComponent],
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
      date_revision: ['', [Validators.required]]
    });
  }

  dateReleaseValidator() {
    return (control: any) => {
      if (!control.value) {
        return null; // If no value is entered, don't validate.
      }

      // Parse the selected date from the control value and reset time using UTC.
      const selected = new Date(control.value);
      const selectedUTC = Date.UTC(selected.getUTCFullYear(), selected.getUTCMonth(), selected.getUTCDate());

      // Get today's date in UTC and reset time to midnight using UTC.
      const today = new Date();
      const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

      // If selected date is today or a future date (in UTC), it is valid.
      return selectedUTC >= todayUTC ? null : { pastDate: true };
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

  resetForm(): void {
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
