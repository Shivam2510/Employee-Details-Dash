import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() control!: AbstractControl;

  errorMessage = computed(() => {
    if (!this.control || !this.control.errors || !this.control.touched) return null;

    const errors: ValidationErrors = this.control.errors;

    if (errors['required']) return 'This field is required.';
    if (errors['email']) return 'Invalid email address.';
    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} characters required.`;
    }
    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
    }
    if (errors['min']) return `Minimum value is ${errors['min'].min}.`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}.`;
    if (errors['pattern']) return 'Invalid format.';

    return 'Invalid input.';
  });
}
