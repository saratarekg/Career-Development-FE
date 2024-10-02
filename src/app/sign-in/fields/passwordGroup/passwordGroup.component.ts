import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignUpService } from '../../../services/sign-up.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

const PasswordMatchValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('passwordFormControl')?.value;
  const confirmPassword = control.get('confirmPasswordFormControl')?.value;
  return password === confirmPassword ? null : { passwordMatch: true };
};

@Component({
  selector: 'app-sign-in-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './passwordGroup.component.html',
  styleUrl: './passwordGroup.component.css',
})
export class PasswordGroupComponent {
  constructor(private signUpService: SignUpService) {}

  @Input() passwords!: FormGroup;

  signInForm!: FormGroup;

  onChangePassword() {
    this.signUpService.setPassword(
      this.passwords.get('passwordFormControl')?.value!
    );
  }

  onChangeConfirmPassword() {
    this.signUpService.setConfirmPassword(
      this.passwords.get('confirmPasswordFormControl')?.value!
    );
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
