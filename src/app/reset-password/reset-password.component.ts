import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from "../services/user/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrls: ['./reset-password.component.css'],
  imports: [MatFormFieldModule, MatInput, ReactiveFormsModule, MatButton, NgIf]
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  message: string | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  resetPassword() {
    const { email, newPassword } = this.resetForm.value;
    this.userService.resetPassword(email, newPassword).subscribe(
      response => {
        this.message = response;
        this.resetForm.reset();
      },
      error => {
        this.message = 'Error resetting password';
      }
    );
  }
}
