import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any = []
  nameSearch: string = ''
  editEmployeeForm
  phone1: boolean
  phoneReg = /^[0-9]*[.]?[0-9]*$/;
  constructor(private _employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {

    this.getEmployeesList()

  }

  getEmployeesList() {
 
    this._employeeService.getEmployees()
      //.pipe(pluck('data'))
      .subscribe(
        (res) => {
          console.log(res)
          this._employeeService.getAllEmployees(res)
          this.employees = this._employeeService.allEmployees
          console.log("employees=>", this.employees)
          for (let i = 0; i < this.employees.length; i++) {
            if (this.phoneReg.test(this.employees[i].phone)) {
              this.employees[i].phone
            }else {
              this.employees[i].phone = "N.A"
            }
          }

        }
      )
  }

  addNewEmployee() {
    this.router.navigate(['employees/add'])
  }

  onUpdateEmployee(i) {
    this.router.navigate(['employees/add'])
    this._employeeService.editMode.next(true);
    this._employeeService.newEmployeeId.next(i)
    this.editEmployeeForm = this._employeeService.newEmployeeForm
    console.log(this.editEmployeeForm)
    this.editEmployeeForm.setValue(
      {
        id: this.employees[i].id,
        name: this.employees[i].name,
        phone: this.employees[i].phone,
        city: this.employees[i].address.city,
        address_line1: this.employees[i].address.address_line1,
        address_line2: this.employees[i].address.address_line2,
        postal_code: this.employees[i].address.postal_code
      }
    )
  }
}
