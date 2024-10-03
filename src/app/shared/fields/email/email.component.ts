import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpService } from '../../../services/sign-up.service';
import { LoginService } from '../../../services/login.service';
import { CustomErrorStateMatcher } from '../../custom-error-matcher';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-shared-email',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailComponent {
  constructor(
    private signUpService: SignUpService,
    private loginService: LoginService
  ) {}

  @Input({ required: true }) emailFormControl!: FormControl;
  @Input({ required: true }) isSignUp!: boolean;

  matcher = new CustomErrorStateMatcher();

  onChangeEmail = () => {
    if (this.isSignUp) {
      this.signUpService.setEmail(this.emailFormControl.value!);
    } else {
      this.loginService.setEmail(this.emailFormControl.value!);
    }
  };
}
