import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent {
  constructor(private loginService: LoginService) {}

  @Input({ required: true }) loginFormGroup!: FormGroup;
  // @Input({ required: true }) passwordFormControl!: FormControl;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onChangePassword() {
    this.loginService.setPassword(
      this.loginFormGroup.get('passwordFormControl')?.value
    );
  }
}
