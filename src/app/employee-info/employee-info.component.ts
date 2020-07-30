import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('employeeForm') employeeForm: NgForm
  newEditMode: boolean
  editEmployeeId
  employees: any = [];
  namePattern = ".{4,}";
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor(private _employeeService: EmployeeService,
    private router: Router) { }


  ngOnInit(): void {
    this._employeeService.editMode.subscribe(
      (data) => {
        this.newEditMode = data
      }
    )

    this._employeeService.newEmployeeId.subscribe(
      (data) => {
        this.editEmployeeId = data
      }
    )
  }

  ngAfterViewInit() {
    this._employeeService.getUserForm(this.employeeForm)
  }


  onAddEmployee() {
    if (this.employeeForm.valid) {
      if (this.newEditMode) {
        console.log("In edit mode",this.newEditMode)
       
        this.employees[this.editEmployeeId] = this.employeeForm.value
        this._employeeService.newAddedUser.next(this.employees)
        console.log("ussseees=>", this.employees)
        this.employeeForm.reset();
        this.newEditMode = false;
        this.router.navigate(['employees'])
      } else {
        console.log(this.employeeForm.value.address1)
        let emp = [
          {

            "id": this.employeeForm.value.id,
            "name": this.employeeForm.value.name,
            "phone": this.employeeForm.value.phone,
            "address": {
              address_line1: this.employeeForm.value.address_line1,
              address_line2: this.employeeForm.value.address_line2,
              city: this.employeeForm.value.city,
              postal_code: this.employeeForm.value.postal_code
            },
          }
        ]

        console.log("p =>", emp[0])
        this._employeeService.addEmployee(emp[0])
        .subscribe(data => {
          this.employees = data;
          console.log(this.employees);
        });
       
        this.employeeForm.reset();
        this.router.navigate(['employees'])
      }
    } else {

    }
  }


}
