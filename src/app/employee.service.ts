import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  editMode = new BehaviorSubject(false)
  allEmployees:any =[]
  newEmployeeForm: NgForm
  newEmployeeId = new Subject()
  newAddedUser = new Subject()
  apiurl = 'api/employees';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get(this.apiurl)
  }

  addEmployee(employee) {
    return this.http.post(this.apiurl, employee, this.httpOptions)
      .pipe(tap(data => console.log(data))
      );
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
