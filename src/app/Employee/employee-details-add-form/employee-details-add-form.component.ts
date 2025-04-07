import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

// components import
import { CustomDatePickerComponent } from '../../Shared/FormElements/custom-date-picker/custom-date-picker.component';
import { InputFieldComponent } from '../../Shared/FormElements/input-field/input-field.component';
import { SelectFieldComponent } from '../../Shared/FormElements/select-field/select-field.component';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { FormErrorComponent } from '../../Shared/FormElements/form-error/form-error.component';
import { LocalStorageService } from '../../Shared/services/local-storage.service';
import { EmployeeStateService } from '../../Shared/services/employee-state.service';
import { OnlyLettersDirective } from '../../Shared/directives/only-letters.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-details-add-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomDatePickerComponent,
    InputFieldComponent,
    SelectFieldComponent,
    FooterComponent,
    FormErrorComponent,
    OnlyLettersDirective
  ],
  templateUrl: './employee-details-add-form.component.html',
  styleUrls: ['./employee-details-add-form.component.scss']
})
export class EmployeeDetailsAddFormComponent {
  form: FormGroup;

  employees = signal<{ current: any[]; previous: any[] }>({
    current: [],
    previous: []
  });

  protected roles: any = ['Angular Developer', 'Quality Tester', 'Product Owner', 'Product Designer'];
  private selectedEmployee: any = null;

  constructor(
    private fb: FormBuilder,
    private storage: LocalStorageService,
    private employeeStateService: EmployeeStateService,
    private router: Router
  ) {
    this.loadFromLocalStorage();

    this.form = this.fb.group({
      joinDate: [null, [Validators.required]],
      leftDate: [null],
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.selectedEmployee = this.employeeStateService.getSelectedEmployee()();
    if (this.selectedEmployee) {
      this.form.patchValue(this.selectedEmployee);
    }
  }

  onDatePicked(date: Date) {
    this.form.get('eventDate')?.setValue(date);
  }

  // submit form
  protected saveData() {
  
    // check form is valid
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    // add unique id
    const formValue = this.form.value;
    const employee = {
      ...formValue,
      id: this.selectedEmployee?.id || crypto.randomUUID()
    };

    const leftDate = new Date(formValue.leftDate!);
    const today = new Date();
    const key = formValue.leftDate && leftDate < today ? 'previous' : 'current';

    // edit option data avail
    if (this.selectedEmployee) {
      // Editing existing employee
      this.employees.update(prev => {
        const updated = { ...prev };

        // Remove from both arrays in case role changed
        updated.current = updated.current.filter(emp => emp.id !== employee.id);
        updated.previous = updated.previous.filter(emp => emp.id !== employee.id);

        // Add to the correct array
        updated[key] = [...updated[key], employee];
        return updated;
      });
    } else {
      // Adding new employee
      this.employees.update(prev => ({
        ...prev,
        [key]: [...prev[key], employee]
      }));
    }

    // Save to localStorage
    this.saveToLocalStorage();

    // Reset form and selection
    this.form.reset();
    this.selectedEmployee = null;
    this.employeeStateService.clearSelectedEmployee?.();

    this.redirection();
  }


  // set to local storage
  private saveToLocalStorage() {
    this.storage.set('employees', this.employees());
  }

  // get from localStorage
  private loadFromLocalStorage() {
    const data = this.storage.get<{ current: any[]; previous: any[] }>('employees');
    if (data) {
      this.employees.set(data);
    }
  }

  protected redirection(){
    this.router.navigate(['/'])
  }
}
