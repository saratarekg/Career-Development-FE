import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import {User} from "../../../models/userDto";
import {UserService} from "../../../services/user/user.service";


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
  styleUrls: ['./add-user.component.css']

})
export class AddUserComponent {
  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
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
          alert('User added successfully:');
          userForm.reset();
        },
        error => {
          alert(`Error adding user: ${error.message}`);
        }
      );
    } else {
      console.warn('Form is not valid. Please check the errors and try again.');
    }

  }
}
