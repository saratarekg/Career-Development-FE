import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {UserLearningsService} from "../services/userLearnings/user-learnings.service";
import {ArticleService} from "../services/articlesService/articles-service.service";
import {AuthService} from "../services/auth.service";
import {UsersDTO} from "../models/userDto";
import {LearningManagerComponent} from "./learning-manager/learning-manager.component";
import {ArticleManagerComponent} from "./article-manager/article-manager.component";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-manager-controls',
  standalone: true,
  imports: [
    LearningManagerComponent,
    ArticleManagerComponent,
    NgIf,
    MatButton,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './manager-controls.component.html',
  styleUrls: ['./manager-controls.component.css']
})
export class ManagerControlsComponent implements OnInit {
  managerId: string = 'your-manager-id';
  managedUsers: UsersDTO[] = [];

  // To toggle between views
  selectedView: string = 'learnings';

  constructor(private userService: UserService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.managerId = userId!);
    this.managerId = this.authService.getUserId()!;
    this.getManagedUsers();
  }

  // Fetch managed users
  getManagedUsers(): void {
    this.userService.getManagedUsers(this.managerId).subscribe(users => {
      this.managedUsers = users;
    });
  }
}
