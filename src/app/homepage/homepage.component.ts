import { Component, inject } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomeCardComponent, ScoreboardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private authService: AuthService) {}
  router = inject(Router);

  logout() {
    // Implement logout logic here
    this.authService.logout();
    this.router.navigate(['']);
    console.log('User logged out');
  }
}
