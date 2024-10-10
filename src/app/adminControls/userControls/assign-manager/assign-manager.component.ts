import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-assign-manager',
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.css'],
  standalone: true,
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
export class AssignManagerComponent {
  assignManagerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.assignManagerForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      managerEmail: ['', [Validators.required, Validators.email]],
    });
  }

  assignManager(): void {
    if (this.assignManagerForm.valid) {
      const { userEmail, managerEmail } = this.assignManagerForm.value;
      this.userService.assignManagerByEmail(userEmail, managerEmail).subscribe(
        response => {
          alert(response);
          this.assignManagerForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(`Error assigning manager: ${error.message}`);
        }
      );
    }
  }
}
