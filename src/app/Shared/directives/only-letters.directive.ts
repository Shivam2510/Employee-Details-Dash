import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyLetters]',
  standalone: true
})
export class OnlyLettersDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let input = event.target.value;

    // Allow letters and space only
    input = input.replace(/[^a-zA-Z ]/g, '');

    // Remove leading spaces
    input = input.replace(/^\s+/, '');

    // Replace multiple spaces with single space
    input = input.replace(/\s{2,}/g, ' ');

    // Update form control
    this.control.control?.setValue(input, { emitEvent: false });
  }
}
