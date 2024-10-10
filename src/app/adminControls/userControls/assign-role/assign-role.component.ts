import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-assign-role',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.css'
})
export class AssignRoleComponent {

  assignRoleForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.assignRoleForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
    });
  }

  assignRole(): void {
    if (this.assignRoleForm.valid) {
      const { userEmail, roleId } = this.assignRoleForm.value;
      this.userService.assignRoleToUser(userEmail, roleId).subscribe(
        response => {
          alert(response);
          this.assignRoleForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(`Error assigning role: ${error.message}`);
        }
      );
    }
  }

}
