import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  forkJoin,
  switchMap,
  map,
  catchError,
  throwError,
} from 'rxjs';
import { PaginatedUsers, UserScoresDTO } from '../../models/userDto';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class JourneyMapService {
  private usersAPI = environment.usersAPI;
  private usersScoresAPI = environment.usersScoresAPI;

  constructor(private http: HttpClient) {}

  getUserProgress(page: number, size: number): Observable<any[]> {
    return this.http
      .get<PaginatedUsers>(
        `${this.usersAPI}/allUsersPaginated?page=${page}&size=${size}`
      )
      .pipe(
        switchMap((users) => {
          const scoreRequests = users.content.map((user) =>
            this.getScore(user.id)
          );

          return forkJoin(scoreRequests).pipe(
            map((scores) => {
              const usersWithScores = users.content.map((user, index) => ({
                firstName: user.firstName,
                lastName: user.lastName,
                score: scores[index]?.score || 0,
              }));

              return usersWithScores;
            })
          );
        })
      );
  }

  private getScore(userId: string): Observable<UserScoresDTO> {
    return this.http
      .get<UserScoresDTO>(`${this.usersScoresAPI}/${userId}`)
      .pipe(
        catchError((err) => {
          console.error(`Error fetching score for user with ID ${userId}`, err);
          return throwError(err);
        })
      );
  }
}
