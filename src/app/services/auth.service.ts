import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return date !== null && date.valueOf() > new Date().valueOf();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    console.log(this.getTokenExpirationDate(token));

    return this.isTokenExpired();
  }
}
