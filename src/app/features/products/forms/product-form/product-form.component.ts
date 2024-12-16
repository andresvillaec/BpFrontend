// product-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() productForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() formReset = new EventEmitter<void>();

  ngOnInit(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe(dateRelease => {
      if (dateRelease) {
        // Calculate one year later for date_revision
        const releaseDate = new Date(dateRelease);
        const revisionDate = new Date(
          releaseDate.setFullYear(releaseDate.getFullYear() + 1)
        )
          .toISOString()
          .split('T')[0]; // Format as YYYY-MM-DD

        // Update the date_revision field
        this.productForm.get('date_revision')?.setValue(revisionDate, { emitEvent: false });
      }
    });
  }

  // Helper for field validation CSS
  isFieldInvalid(field: string): boolean {
    return !!(this.productForm.get(field)?.invalid && this.productForm.get(field)?.touched);
  }

  // Emit submit event
  onSubmit() {
    this.formSubmit.emit();
  }

  // Emit reset event
  resetForm() {
    this.formReset.emit();
  }
}