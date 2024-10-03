import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpService: HttpService) {}

  private email = new BehaviorSubject<string>('');
  private password = new BehaviorSubject<string>('');

  email$ = this.email.asObservable();
  password$ = this.password.asObservable();

  setEmail(email: string) {
    this.email.next(email);
  }
  setPassword(password: string) {
    this.password.next(password);
  }

  logIn(): Observable<AuthResponse> {
    return this.httpService.logInUser({
      email: this.email.value,
      password: this.password.value,
    });
  }
}
