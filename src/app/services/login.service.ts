import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

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

  logIn() {
    this.httpService.logInUser({
      email: this.email.value,
      password: this.password.value,
    });
  }
}
