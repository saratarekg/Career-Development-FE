import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import("./home-page/home-page.component").then(m => m.HomePageComponent) },
  { path: 'admin', loadComponent: () => import("./admin-page/admin-page.component").then(m => m.AdminPageComponent) },

];
