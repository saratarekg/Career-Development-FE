import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormField } from "@angular/material/form-field";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { UserService } from "../services/user/user.service"; // Import UserService
import { HttpErrorResponse } from '@angular/common/http'; // To handle HTTP errors

@Component({
  selector: 'app-freeze-user',
  templateUrl: './freeze-user.component.html',
  styleUrls: ['./freeze-user.component.css'],
  imports: [
    MatFormField,
    MatButtonToggleGroup,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggle,
    MatButton,
    NgIf
  ],
  standalone: true
})
export class FreezeUserComponent implements OnInit {
  userForm: FormGroup;
  message: string = '';
  selectedAction: 'freeze' | 'unfreeze' | 'delete' = 'freeze'; // Default action

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')?.value;
      switch (this.selectedAction) {
        case 'freeze':
          this.freezeUser(email);
          break;
        case 'unfreeze':
          this.unfreezeUser(email);
          break;
        case 'delete':
          this.deleteUser(email);
          break;
      }
    }
  }

  freezeUser(email: string) {
    this.userService.freezeUserByEmail(email).subscribe(
      response => {
        this.message = response;
        this.userForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.message = `Error freezing user: ${error.message}`;
      }
    );
  }

  unfreezeUser(email: string) {
    this.userService.unfreezeUserByEmail(email).subscribe(
      response => {
        this.message = response;
        this.userForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.message = `Error unfreezing user: ${error.message}`;
      }
    );
  }

  deleteUser(email: string) {
    this.userService.deleteUserByEmail(email).subscribe(
      response => {
        this.message = response;
        this.userForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.message = `Error deleting user: ${error.message}`;
      }
    );
  }

  setAction(action: 'freeze' | 'unfreeze' | 'delete') {
    this.selectedAction = action;
    this.userForm.reset(); // Reset form on action change
  }
}
