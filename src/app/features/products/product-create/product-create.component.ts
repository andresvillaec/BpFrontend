import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup; // Angular form group
  today = new Date(); // To compare the release date

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) {
  }

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
      date_release: ['', [Validators.required, this.dateReleaseValidator()]], // Custom validator for > today
      date_revision: ['', [Validators.required, this.dateRevisionValidator()]] // Custom validator for +1 year
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

  resetForm(): void {
    this.productForm.reset();
  }

  // Submit the form
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          alert('Product created successfully!');
          this.router.navigate(['/products']);  // Redirect on success
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert('There was an error creating the product.');  // Handle error
        }
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
