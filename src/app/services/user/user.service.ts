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
}
