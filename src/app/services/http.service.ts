import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersSignUpDTO } from '../models/userDto';
import { LoginDto } from '../models/loginDto';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponse } from '../models/authResponse';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  private urlUsers = 'http://localhost:8080/api/users';
  private urlAuth = 'http://localhost:8080/api/auth';

  signUpUser(user: UsersSignUpDTO) {
    return this.httpClient
      .post(`${this.urlUsers}/signUp`, user)
      .subscribe((user) => {
        console.log(user);
      });
  }

  logInUser(loginDto: LoginDto): Observable<AuthResponse> {
    const authResponse: Observable<AuthResponse> =
      this.httpClient.post<AuthResponse>(`${this.urlAuth}/login`, loginDto, {
        withCredentials: true,
      });
    console.log(authResponse);
    return authResponse;
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
