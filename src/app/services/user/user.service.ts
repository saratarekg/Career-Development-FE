import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/userDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersAPI = 'http://localhost:8080/api/users';
  private usersScoresAPI = 'http://localhost:8081/api/userScores';

  constructor(private http: HttpClient) {}

  // example
  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersAPI}/${id}`, {
      withCredentials: true,
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersAPI}/add`, user);
  }

  freezeUserByEmail(email: string): Observable<string> {
    return this.http.put<string>(`${this.usersAPI}/freeze`, null, {
      params: { email },
    });
  }

  unfreezeUserByEmail(email: string): Observable<string> {
    return this.http.put<string>(`${this.usersAPI}/unfreeze`, null, {
      params: { email },
    });
  }

  deleteUserByEmail(email: string): Observable<string> {
    return this.http.delete<string>(`${this.usersAPI}/deleteByEmail/${email}`);
  }

  resetPassword(email: string, newPassword: string): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/resetPassword/${email}`,
      null,
      { params: { newPassword } }
    );
  }

  assignManagerByEmail(
    userEmail: string,
    managerEmail: string
  ): Observable<string> {
    return this.http.put<string>(`${this.usersAPI}/assignManager`, null, {
      params: { userEmail, managerEmail },
    });
  }
}
