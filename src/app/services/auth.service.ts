import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);
  private isManager = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<string | null>(null);

  loggedIn$ = this.loggedIn.asObservable();
  isAdmin$ = this.isAdmin.asObservable();
  isManager$ = this.isManager.asObservable();
  userId$ = this.userId.asObservable();

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
    this.userId.next(userId);
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin.next(isAdmin);
  }

  setIsManager(isManager: boolean): void {
    this.isManager.next(isManager);
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
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
    this.setIsAdmin(false);
    this.setIsManager(false);
    this.userId.next(null);
  }

  getIsAdmin(): boolean {
    return this.isAdmin.getValue();
  }

  getIsManager(): boolean {
    return this.isManager.getValue();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const value = this.isTokenExpired();
    this.loggedIn.next(value);
    return value;
  }
}
