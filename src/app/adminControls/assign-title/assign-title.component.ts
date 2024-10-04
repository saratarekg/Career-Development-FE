import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from "../../services/user/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-assign-title',
  templateUrl: './assign-title.component.html',
  standalone: true,
  styleUrls: ['./assign-title.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ]
})
export class AssignTitleComponent implements OnInit {
  assignTitleForm: FormGroup;
  departments: any[] = [];
  titles: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.assignTitleForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  onDepartmentChange(event: any) {
    this.assignTitleForm.patchValue({
      department: event.value
    });
    const departmentId = event.value;
    console.log('Selected Department ID:', departmentId);
    this.userService.getTitlesByDepartment(departmentId).subscribe(data => {
      this.titles = data;
    });
  }



  assignTitle() {
    const email = this.assignTitleForm.get('email')?.value;
    const titleId = this.assignTitleForm.get('title')?.value;
    this.userService.assignTitleToUser(email, titleId).subscribe(response => {
      alert(response);
      this.assignTitleForm.reset();
    },
      (error: HttpErrorResponse) => {
        alert(`Error assigning title: ${error.message}`);
      });
  }
}
