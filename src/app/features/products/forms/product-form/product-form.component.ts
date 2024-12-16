// product-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() productForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() formReset = new EventEmitter<void>();


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