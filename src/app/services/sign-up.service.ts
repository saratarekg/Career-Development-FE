import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private httpService: HttpService) {}

  private firstName = new BehaviorSubject<string>('');
  private lastName = new BehaviorSubject<string>('');
  private email = new BehaviorSubject<string>('');
  private password = new BehaviorSubject<string>('');
  private confirmPassword = new BehaviorSubject<string>('');
  private phone = new BehaviorSubject<string>('');

  firstName$ = this.firstName.asObservable();
  lastName$ = this.lastName.asObservable();
  email$ = this.email.asObservable();
  password$ = this.password.asObservable();
  confirmPassword$ = this.confirmPassword.asObservable();
  phone$ = this.phone.asObservable();

  setFirstName(firstName: string) {
    this.firstName.next(firstName);
  }
  setLastName(lastName: string) {
    this.lastName.next(lastName);
  }
  setEmail(email: string) {
    this.email.next(email);
  }
  setPassword(password: string) {
    this.password.next(password);
  }
  setConfirmPassword(confirmPassword: string) {
    this.confirmPassword.next(confirmPassword);
  }
  setPhone(phone: string) {
    this.phone.next(phone);
  }

  signUp() {
    console.log('signing up');
    this.httpService.signUpUser({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
    });
  }
}
