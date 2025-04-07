// employee-state.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  private selectedEmployeeSignal = signal<any | null>(null);

  setSelectedEmployee(employee: any) {
    this.selectedEmployeeSignal.set(employee);
  }

  getSelectedEmployee(): WritableSignal<any | null> {
    return this.selectedEmployeeSignal;
  }

  clearSelectedEmployee() {
    this.selectedEmployeeSignal.set(null);
  }
}
