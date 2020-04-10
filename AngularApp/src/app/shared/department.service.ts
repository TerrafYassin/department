import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var M: any;
import { Department } from './department.model';
@Injectable()
export class DepartmentService {
  selectedDepartment: Department;
  departments: Department[];
  readonly baseURL = 'http://localhost:3000/Department/';

  constructor(private http: HttpClient) { }

  postDepartment(dept: Department) {

    return this.http.post(this.baseURL, dept);
  }

  getDepartmentList() {
    console.log("je suis dans les service")
    return this.http.get(this.baseURL);
  }

  putDepartment(dept: Department) {
    return this.http.put(this.baseURL + `/${dept._id}`, dept);
  }
  
  deleteDepartment(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  

}
