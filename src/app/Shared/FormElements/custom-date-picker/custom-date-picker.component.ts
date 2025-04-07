import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModalBodyComponent } from '../../Components/modal-body/modal-body.component';
import { FooterComponent } from '../../Components/footer/footer.component';


@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, ButtonModule, InputTextModule, ModalBodyComponent, FooterComponent],
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true
    }
  ]
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  showModal = false;
  selectedDate: Date | null = null;
  @Input() placeholder: string = '';
  @Input() icon: string = 'pi-user';

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  onChange = (date: Date | null) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
    this.selectedDate = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveDate() {
    this.onChange(this.selectedDate);
    this.closeModal();
  }

  setQuickDate(option: string) {
    const today = new Date();
    let result: Date;

    switch (option) {
      case 'today':
        result = new Date();
        break;
      case 'nextMonday':
        result = this.getNextDay(today, 1);
        break;
      case 'nextTuesday':
        result = this.getNextDay(today, 2);
        break;
      case 'nextWeek':
        result = new Date();
        result.setDate(today.getDate() + 7);
        break;
      default:
        result = new Date();
    }

    this.selectedDate = result;
  }

  private getNextDay(date: Date, day: number): Date {
    const result = new Date(date);
    const diff = (day + 7 - result.getDay()) % 7 || 7;
    result.setDate(result.getDate() + diff);
    return result;
  }
}
