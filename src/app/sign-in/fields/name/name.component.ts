import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/sign-up.service';

@Component({
  selector: 'app-sign-in-name',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './name.component.html',
  styleUrl: './name.component.css',
})
export class NameComponent {
  constructor(private signUpService: SignUpService) {}

  @Input({ required: true }) firstNameFormControl!: FormControl;
  @Input({ required: true }) lastNameFormControl!: FormControl;

  onChangeFirstName() {
    this.signUpService.setFirstName(this.firstNameFormControl.value!);
  }

  onChangeLastName() {
    this.signUpService.setLastName(this.lastNameFormControl.value!);
  }
}
