import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User, UsersDTO} from '../../models/userDto';
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
        responseType: 'text' as 'json'
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
        responseType: 'text' as 'json'
      }
    );
  }

  deleteUserByEmail(email: string): Observable<string> {
    return this.http.delete<string>(`${this.usersAPI}/deleteByEmail`, {
      params: { email },
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  resetPassword(email: string, newPassword: string): Observable<string> {
    return this.http.put<string>(
      `${this.usersAPI}/resetPassword`,
      null,
      {
        params: { email, newPassword },
        withCredentials: true,
        responseType: 'text' as 'json'
      }
    );
  }

  assignManagerByEmail(
    userEmail: string,
    managerEmail: string
  ): Observable<Object> {
    return this.http.put(
      `${this.usersAPI}/assignManager`,
      null,
      {
        params: { userEmail, managerEmail },
        withCredentials: true,
        responseType: 'text' as 'json'
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

  assignTitleToUser(email: string, titleId: string): Observable<object> {
    return this.http.put(
      `${this.usersAPI}/assignTitle?email=${email}&titleId=${titleId}`,
      null,
      { withCredentials: true,
        responseType: 'text' as 'json'
      },
    );
  }

  assignRoleToUser(email: string, roleId: string): Observable<object> {
    return this.http.put(
      `${this.usersAPI}/assignRole?email=${email}&roleId=${roleId}`,
      null,
      { withCredentials: true,
        responseType: 'text' as 'json'
      },
    );
  }


  getManagedUsers(managerId: string): Observable<UsersDTO[]> {
    return this.http.get<UsersDTO[]>(`${this.usersAPI}/managed/${managerId}`,
      {
        withCredentials: true,
      });
  }

}
