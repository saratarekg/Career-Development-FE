import {Component, viewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

import {AdminLearningsControlComponent} from "../learningsControl/admin-learnings-control/admin-learnings-control.component";
import {AddUserComponent} from "../userControls/add-user/add-user.component";
import {ManageUserComponent} from "../userControls/manage-user/manage-user.component";
import {ResetPasswordComponent} from "../userControls/reset-password/reset-password.component";
import {AssignTitleComponent} from "../userControls/assign-title/assign-title.component";
import {AssignManagerComponent} from "../userControls/assign-manager/assign-manager.component";
import {AssignRoleComponent} from "../userControls/assign-role/assign-role.component";

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
    ManageUserComponent,

    ResetPasswordComponent,
    AssignTitleComponent,
    AssignManagerComponent,
    AssignRoleComponent,
    AdminLearningsControlComponent
  ],

  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  accordion = viewChild.required(MatAccordion);

}
