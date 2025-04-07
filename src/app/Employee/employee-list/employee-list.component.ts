import { Component, signal } from '@angular/core';
import { LocalStorageService } from '../../Shared/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { EmployeeStateService } from '../../Shared/services/employee-state.service';
import { Router } from '@angular/router';

type EmployeeKey = 'current' | 'previous';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})


export class EmployeeListComponent {

   // Signal holding both employee categories
   employees = signal<{ current: any[]; previous: any[] }>({
    current: [],
    previous: [],
  });

  protected objectKeys = (obj: { current: any[]; previous: any[] }): EmployeeKey[] => {
    return Object.keys(obj) as EmployeeKey[];
  };


  constructor( private storage: LocalStorageService, private employeeStateService: EmployeeStateService, private router: Router) {
    this.loadFromLocalStorage();
  }
  

  // get Data from localStorage
  private loadFromLocalStorage() {
    const data = this.storage.get<{ current: any[]; previous: any[] }>('employees');
    if (data) {
      this.employees.set(data);
    }
  }

  trackByEmployeeId(index: number, item: any): string {
    return item.id;
  }


  

  deleteEmployee(employee: any, key: 'current' | 'previous') {
    const updatedList = this.employees()[key].filter(e => e.id !== employee.id);
  
    this.employees.set({
      ...this.employees(),
      [key]: updatedList
    });
  
    this.saveToLocalStorage();
  }
  

protected editEmployee(emp: any) {
  this.employeeStateService.setSelectedEmployee(emp);
  this.router.navigate(['/employee-details']);
}


 // save to localStorage key
 private saveToLocalStorage() {
  this.storage.set('employees', this.employees());
}

protected redirection(){
  this.router.navigate(['/employee-details'])
}



  
}
