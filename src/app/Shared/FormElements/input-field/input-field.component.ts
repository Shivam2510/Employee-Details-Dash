import {
  Component,
  Input,
  ChangeDetectionStrategy,
  signal,
  WritableSignal,
  effect,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() icon: string = 'pi-user';

  // Internal signal-based value
  value: WritableSignal<string> = signal('');

  disabled = false;

  // Callback functions
  private onChange = (value: any) => {};
  protected onTouched = () => {};

  writeValue(value: any): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor() {
    // Sync signal to control
    effect(() => {
      this.onChange(this.value());
    });
  }

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
  }
}
