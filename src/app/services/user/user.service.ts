import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/userDto';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersAPI = environment.usersAPI;
  private titlesAPI = environment.titlesAPI;
  private departmentsAPI = environment.departmentsAPI;

  constructor(private http: HttpClient) {}

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersAPI}/${id}`, {
      withCredentials: true,
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersAPI}/add`, user, {
      withCredentials: true,
    });
  }

  freezeUserByEmail(email: string): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/freeze`,
      null,
      {
        params: { email },
        withCredentials: true,
      }
    );
  }

  unfreezeUserByEmail(email: string): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/unfreeze`,
      null,
      {
        params: { email },
        withCredentials: true,
      }
    );
  }

  deleteUserByEmail(email: string): Observable<string> {
    return this.http.delete<string>(`${this.usersAPI}/deleteByEmail/${email}`, {
      withCredentials: true,
    });
  }

  resetPassword(email: string, newPassword: string): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/resetPassword/${email}`,
      null,
      {
        params: { newPassword },
        withCredentials: true,
      }
    );
  }

  assignManagerByEmail(
    userEmail: string,
    managerEmail: string
  ): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/assignManager`,
      null,
      {
        params: { userEmail, managerEmail },
        withCredentials: true,
      }
    );
  }

  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.departmentsAPI}`, {
      withCredentials: true,
    });
  }

  getTitlesByDepartment(departmentId: string): Observable<any> {
    return this.http.get(`${this.titlesAPI}/getByDepartment/${departmentId}`, {
      withCredentials: true,
    });
  }

  assignTitleToUser(email: string, titleId: string): Observable<any> {
    return this.http.put(
      `${this.usersAPI}/assignTitle?email=${email}&titleId=${titleId}`,
      null,
      { withCredentials: true }
    );
  }
}
