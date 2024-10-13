import {Component, inject, OnInit} from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeCardComponent } from './home/home-card/home-card.component';

import {NavbarComponent} from "./navbar/navbar.component";
import {PaginatedUsers} from "./models/userDto";
import {ScoreboardService} from "./services/scoreboard/scoreboard.service";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HomeCardComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{

  page: number = 0;
  size: number = 10;
  paginatedUsers!: PaginatedUsers;

  constructor(private userScoresService: ScoreboardService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.calculateScoresForAllUsers();
  }

  calculateScoresForAllUsers(): void {
    this.userService.getAllUsersPaginated(this.page, this.size).subscribe({
      next: (response) => {
        this.paginatedUsers = response;

        // Iterate over each user and calculate their score
        this.paginatedUsers.content.forEach(user => {
          this.userScoresService.calculateUserScore(user.id);
        });

      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}
