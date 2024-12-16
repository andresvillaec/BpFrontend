import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ProductFormComponent } from "../forms/product-form/product-form.component";

@Component({
  selector: 'app-product-create',
  imports: [ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form with validation rules
  initializeForm() {
    this.productForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      logo: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      date_release: ['', [Validators.required, this.dateReleaseValidator()]],
      date_revision: ['', [Validators.required,]]
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

  resetForm(): void {
    this.productForm.reset();
  }

  // Submit the form
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          this.router.navigate(['/products']); // Redirect on success
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert(err.error.message); // Handle error
        }
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}