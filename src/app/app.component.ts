import { Component, inject } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SignUpComponent } from './sign-in/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ScoreboardComponent } from './home/scoreboard/scoreboard.component';
import { JourneyMapComponent } from './home/journey-map/journey-map.component';
import { HomeCardComponent } from './home/home-card/home-card.component';
import { AuthService } from './services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    SignUpComponent,
    LoginComponent,
    RouterLink,
    RouterLinkActive,
    ScoreboardComponent,
    JourneyMapComponent,
    HomeCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatToolbar,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'CareerDevelopmentApplicationFE';

  logout() {
    // Implement logout logic here
    this.authService.logout();
    console.log('User logged out');
  }
}
