import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  loggedIn$ = this.loggedIn.asObservable();
  isAdmin$ = this.isAdmin.asObservable();

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin.next(isAdmin);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
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

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.setIsAdmin(false);
    // Or handle cookies if you're using them
  }

  getIsAdmin(): boolean {
    return this.isAdmin.getValue();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    console.log(this.getTokenExpirationDate(token));
    const value = this.isTokenExpired();
    this.loggedIn.next(value);
    return value;
  }
}
