import { Component, inject, OnInit } from '@angular/core';
import { EmailComponent } from '../shared/fields/email/email.component';
import { PasswordGroupComponent } from './fields/passwordGroup/passwordGroup.component';
import { PhoneComponent } from './fields/phone/phone.component';
import { NameComponent } from './fields/name/name.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';

const PasswordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('passwordFormControl')?.value;
  const confirmPassword = control.get('confirmPasswordFormControl')?.value;
  if (!password || !confirmPassword) {
    return { passwordEmpty: true };
  }
  return password === confirmPassword ? null : { passwordMatch: true };
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    EmailComponent,
    PasswordGroupComponent,
    PhoneComponent,
    NameComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(private signUpService: SignUpService) {}
  signUpForm!: FormGroup;

  router = inject(Router);

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstNameFormControl: new FormControl('', [Validators.required]),
      lastNameFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [Validators.required]),
      passwords: new FormGroup(
        {
          passwordFormControl: new FormControl('', [Validators.required]),
          confirmPasswordFormControl: new FormControl('', [
            Validators.required,
          ]),
        },
        { validators: PasswordMatchValidator }
      ),
      phoneFormControl: new FormControl('', [Validators.required]),
    });
  }

  get firstNameFormControl(): FormControl {
    return this.signUpForm.get('firstNameFormControl') as FormControl;
  }
  get lastNameFormControl(): FormControl {
    return this.signUpForm.get('lastNameFormControl') as FormControl;
  }
  get emailFormControl(): FormControl {
    return this.signUpForm.get('emailFormControl') as FormControl;
  }
  get phoneFormControl(): FormControl {
    return this.signUpForm.get('phoneFormControl') as FormControl;
  }

  get passwordsFormGroup(): FormGroup {
    return this.signUpForm.get('passwords') as FormGroup;
  }

  onSubmit() {
    console.log('Submit');
    this.signUpService.signUp();
    this.router.navigate(['signup', 'success']);
  }
}
