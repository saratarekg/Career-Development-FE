import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-in/sign-up.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import {LearningsComponent} from "./learningsLibrary/learnings/learnings.component";
import {SubmitLearningFormComponent} from "./userLearnings/submit-learning-form/submit-learning-form.component";
import {MyLearningsComponent} from "./userLearnings/my-learnings/my-learnings.component";
import {ManagerControlsComponent} from "./manager-controls/manager-controls.component";
import {ManagerGuardService} from "./services/manager-guard.service";
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
    path: 'library',
    component: LearningsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'myLearnings',
    component: MyLearningsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./adminControls/admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent
      ),
    // canActivate: [AuthGuardService],
    canActivate: [AdminGuardService],

  },
  {
    path: 'manage',
    component: ManagerControlsComponent,
    canActivate: [ManagerGuardService],

  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
