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
  constructor(private httpClient: HttpClient,
              private authService: AuthService
  ) {}

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
    return this.httpClient.post<AuthResponse>(`${this.urlAuth}/login`, loginDto, {
      withCredentials: true,
    }).pipe(
      map((authResponse: AuthResponse) => {
        // Store the token, userId, isManager and isAdmin status
        this.authService.setToken(authResponse.accessToken);
        this.authService.setIsAdmin(authResponse.admin);
        this.authService.setIsManager(authResponse.manager);
        this.authService.setUserId(authResponse.userId);


        return authResponse;
      })
    );
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
