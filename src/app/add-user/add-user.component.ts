import { Component } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../services/user/user.service";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] // Corrected from styleUrl to styleUrls
})
export class AddUserComponent {

  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: "",
    phone: ""
  };

  constructor(private userService: UserService) {}

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  addUser(userForm: NgForm): void {
    if (userForm.valid) {
      this.userService.addUser(this.newUser).subscribe(
        response => {
          console.log('User added successfully:', response);
          userForm.reset();
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.warn('Form is not valid. Please check the errors and try again.');
    }
  }
}
