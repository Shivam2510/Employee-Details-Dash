import {
  Component,
  Input,
  ChangeDetectionStrategy,
  forwardRef,
  signal,
  WritableSignal,
  effect
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ModalBodyComponent } from '../../Components/modal-body/modal-body.component';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    ModalBodyComponent
  ],
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() options: string[] = []; // Using direct string array like ['Admin', 'User']

  selectedValue: WritableSignal<any> = signal(null);
  disabled = false;
  showModal = false;

  private onChange = (value: any) => {};
  protected onTouched = () => {};

  constructor() {
    // Sync signal to ControlValueAccessor
    effect(() => {
      const value = this.selectedValue();
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    this.selectedValue.set(value);
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

  onSelectChange(event: any): void {
    this.selectedValue.set(event.value);
    this.showModal = false;
  }

  onModelChange(value: any): void {
    this.selectedValue.set(value);
  }

  dropDownClick(): void {
    this.showModal = true;
  }

  trackByOption(index: number, item: string): string {
    return item;
  }
}
