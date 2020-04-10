import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../shared/department.service';
import { Department } from '../shared/department.model';
declare var M: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService]

})
export class DepartmentComponent implements OnInit {
  constructor(public departmentService: DepartmentService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshDepartmentList();
  }
  onSubmit(form: NgForm) {

    
   
    if (form.value._id == "" || form.value._id == null) {
      this.departmentService.postDepartment(form.value).subscribe((res) => {
        
        this.resetForm(form);
      });
    }
    else {
   
      this.departmentService.putDepartment(form.value).subscribe((res) => {
        this.resetForm(form);
    
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.departmentService.selectedDepartment = {
      _id: "",
      name: "",
      manager:"",
      etage:0
    }
  }
  refreshDepartmentList(){
    console.log("je suis la")
    this.departmentService.getDepartmentList().subscribe((res) =>{
    this.departmentService.departments=res as Department[];

  });
    
  }
  onEdit(dept: Department) {
    this.departmentService.selectedDepartment = dept;
    this.refreshDepartmentList();

  }
  onDelete(_id:string,form:NgForm){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.departmentService.deleteDepartment(_id).subscribe((res) => {
        this.refreshDepartmentList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
  }
