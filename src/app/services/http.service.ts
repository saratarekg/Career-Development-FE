import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../models/userDto';
import { LoginDto } from '../models/loginDto';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponse } from '../models/authResponse';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private urlUsers = 'http://localhost:8080/api/users';
  private urlAuth = 'http://localhost:8080/api/auth';

  signUpUser(user: UserDto) {
    return this.httpClient
      .post(`${this.urlUsers}/signUp`, user)
      .subscribe((user) => {
        console.log(user);
      });
  }

  logInUser(loginDto: LoginDto) {
    return this.httpClient
      .post<AuthResponse>(`${this.urlAuth}/login`, loginDto, {
        withCredentials: true,
      })
      .subscribe((token) => {
        this.authService.setToken(token.accessToken);
        console.log(token.accessToken);
      });
  }

  isTokenValid(token: string): Observable<boolean> {
    return this.httpClient
      .post<boolean>(
        `${this.urlAuth}/isTokenValid`,
        { token },
        { withCredentials: true }
      )
      .pipe(map((response) => !!response));
  }
}
