import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-in/sign-up.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
    children: [
      {
        path: 'success',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./adminControls/admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent
      ),
    canActivate: [AdminGuardService],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
