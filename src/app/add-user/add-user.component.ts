import { Component } from '@angular/core';
import { User } from '../models/userDto';
import { UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
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

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        // Handle success
      },
      (error) => {
        console.error('Error adding user:', error);
        // Handle error
      }
    );
  }
}
