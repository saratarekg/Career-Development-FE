import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from '../shared/fields/email/email.component';
import { PasswordComponent } from './fields/password/password.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {AuthResponse} from "../models/authResponse";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['logIn']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'setIsAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        EmailComponent,
        PasswordComponent,
        MatInputModule,
        MatFormFieldModule,
        LoginComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password controls', () => {
    expect(component.emailFormControl).toBeTruthy();
    expect(component.passwordFormControl).toBeTruthy();
    expect(component.emailFormControl.valid).toBeFalse();
    expect(component.passwordFormControl.valid).toBeFalse();
  });

  it('should call loginService.logIn and authService.setToken on successful login', () => {
    const mockToken: AuthResponse = {manager: false, userId: "id", accessToken: 'token123', admin: true };
    loginService.logIn.and.returnValue(of(mockToken));

    component.onSubmit();

    expect(loginService.logIn).toHaveBeenCalled();
    expect(authService.setToken).toHaveBeenCalledWith('token123');
    expect(authService.setIsAdmin).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
    expect(component.errorMessage).toBe('');
  });

  it('should set error message if login fails with 401', () => {
    const errorResponse = { status: 401 };
    loginService.logIn.and.returnValue(throwError(() => errorResponse));

    component.onSubmit();

    expect(loginService.logIn).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Incorrect email or password');
  });

  it('should set generic error message if login fails with another error', () => {
    const errorResponse = { status: 500 };
    loginService.logIn.and.returnValue(throwError(() => errorResponse));

    component.onSubmit();

    expect(loginService.logIn).toHaveBeenCalled();
    expect(component.errorMessage).toBe('An unexpected error occurred. Please try again.');
  });

  it('should reset the form after submission', () => {
    const mockToken: AuthResponse = {manager: false, userId: "id", accessToken: 'token123', admin: true };
    loginService.logIn.and.returnValue(of(mockToken));

    component.loginForm.controls['emailFormControl'].setValue('test@example.com');
    component.loginForm.controls['passwordFormControl'].setValue('password');

    component.onSubmit();

    expect(component.loginForm.controls['emailFormControl'].value).toBe(null);
    expect(component.loginForm.controls['passwordFormControl'].value).toBe(null);
  });
});
