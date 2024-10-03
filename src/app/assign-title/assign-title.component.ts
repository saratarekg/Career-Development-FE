import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from "../services/user/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-assign-title',
  templateUrl: './assign-title.component.html',
  standalone: true,
  styleUrls: ['./assign-title.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf
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

  onDepartmentChange() {
    const departmentId = this.assignTitleForm.get('department')?.value;
    this.userService.getTitlesByDepartment(departmentId).subscribe(data => {
      this.titles = data;
    });
  }

  assignTitle() {
    const email = this.assignTitleForm.get('email')?.value;
    const titleId = this.assignTitleForm.get('title')?.value;
    this.userService.assignTitleToUser(email, titleId).subscribe(response => {
      alert(response);
    });
  }
}
