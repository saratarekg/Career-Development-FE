import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/sign-up.service';

@Component({
  selector: 'app-sign-in-phone',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
})
export class PhoneComponent {
  constructor(private signUpService: SignUpService) {}

  @Input({ required: true }) phoneFormControl!: FormControl;

  onChangePhone() {
    this.signUpService.setPhone(this.phoneFormControl.value!);
  }
}
