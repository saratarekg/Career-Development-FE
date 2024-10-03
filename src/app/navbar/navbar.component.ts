import { Component } from '@angular/core';
import {MatAnchor, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatCardHeader} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    console.log('User logged out');
  }
}
