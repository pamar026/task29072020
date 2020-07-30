import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  editMode = new BehaviorSubject(false)
  allEmployees:any =[]
  newEmployeeForm: NgForm
  constructor(private http:HttpClient) { }

  getEmployees(){
   return this.http.get("assets/employee.json")
  }

  getAllEmployees(emp){
    console.log("emp=>",emp)
    this.allEmployees = emp
    console.log("allEmployees=>",this.allEmployees)
  }

  getUserForm(empForm) {
    this.newEmployeeForm = empForm
  }
}
