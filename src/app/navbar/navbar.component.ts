import { Component, OnInit } from '@angular/core';
import {
  MatAnchor,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatCardHeader } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NotificationComponent} from "../notifications/notifications.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatAnchor,
    MatCardHeader,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NotificationComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoggedIn!: boolean;
  isAdmin!: boolean;
  isManager!:boolean;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log('User logged in:', loggedIn);
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      console.log('Is the user an admin?', isAdmin);
    });

    this.authService.isManager$.subscribe((isManager) => {
      this.isManager = isManager;
      console.log('Is the user a manager?', isManager);
    });
  }

  logout() {
    this.authService.logout();
    console.log('User logged out');
  }
}
