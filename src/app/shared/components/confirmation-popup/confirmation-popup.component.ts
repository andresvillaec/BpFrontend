import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  imports: [],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {
  @Input() productName: string | undefined;

  // Event emitted when the user confirms the deletion
  @Output() confirmDelete = new EventEmitter<void>();

  // Event emitted when the user cancels the deletion
  @Output() cancelDelete = new EventEmitter<void>();

  // Called when the user confirms delete
  onConfirm(): void {
    this.confirmDelete.emit();
  }

  // Called when the user cancels delete
  onCancel(): void {
    this.cancelDelete.emit();
  }
}
