import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PasswordComponent } from './fields/password/password.component';
import { EmailComponent } from '../shared/fields/email/email.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, EmailComponent, PasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

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
    this.loginService.logIn();
  };
}
