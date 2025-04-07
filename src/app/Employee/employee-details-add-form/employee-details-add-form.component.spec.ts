import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsAddFormComponent } from './employee-details-add-form.component';

describe('EmployeeDetailsAddFormComponent', () => {
  let component: EmployeeDetailsAddFormComponent;
  let fixture: ComponentFixture<EmployeeDetailsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
