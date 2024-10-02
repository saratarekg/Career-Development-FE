import {Component, viewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {AddUserComponent} from "../add-user/add-user.component";
import {FreezeUserComponent} from "../manage-user/freeze-user.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    AddUserComponent,
    FreezeUserComponent,

    ResetPasswordComponent
  ],

  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  accordion = viewChild.required(MatAccordion);

}
