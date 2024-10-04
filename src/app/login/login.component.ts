import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PasswordComponent } from './fields/password/password.component';
import { EmailComponent } from '../shared/fields/email/email.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EmailComponent,
    PasswordComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  errorMessage = '';
  router = inject(Router);
  isLoginMode = false;

  loginForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [Validators.required]),
  });

  get emailFormControl(): FormControl {
    return this.loginForm.get('emailFormControl') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginForm.get('passwordFormControl') as FormControl;
  }

  onSubmit = () => {
    this.loginService.logIn().subscribe({
      next: (token) => {
        this.authService.setToken(token.accessToken);
        this.errorMessage = '';
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.error(error);
        if (error.status === 401) {
          this.errorMessage = 'Incorrect email or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
    this.loginForm.reset();
  };
}
