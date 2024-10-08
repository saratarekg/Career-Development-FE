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
export class ScoreboardService {
  private usersAPI = environment.usersAPI;
  private usersScoresAPI = environment.usersScoresAPI;
  private scoreboardLevelsAPI = environment.scoreboardLevelsAPI;

  constructor(private http: HttpClient) {}

  getScoreboard(page: number, size: number): Observable<any[]> {
    return this.http
      .get<PaginatedUsers>(
        `${this.usersAPI}/allUsersPaginated?page=${page}&size=${size}`,
        { withCredentials: true }
      )
      .pipe(
        switchMap((users) => {
          const scoreRequests = users.content.map((user) =>
            this.getScore(user.id)
          );

          return forkJoin(scoreRequests).pipe(
            switchMap((scores) => {
              const levelRequests = scores.map((score) =>
                this.getLevelName(score?.score || 0)
              );

              return forkJoin(levelRequests).pipe(
                map((levelNames) => {
                  const usersWithScores = users.content.map((user, index) => ({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    score: scores[index]?.score || 0,
                    levelName: levelNames[index],
                    rank: 0,
                  }));

                  const sortedByScore = [...usersWithScores].sort(
                    (a, b) => b.score - a.score
                  );

                  sortedByScore.forEach((user, index) => {
                    user.rank = index + 1;
                  });

                  return usersWithScores;
                })
              );
            })
          );
        })
      );
  }

  private getScore(userId: string): Observable<UserScoresDTO> {
    return this.http
      .get<UserScoresDTO>(`${this.usersScoresAPI}/${userId}`, {
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.error(`Error fetching score for user with ID ${userId}`, err);
          return throwError(err);
        })
      );
  }

  private getLevelName(score: number): Observable<string> {
    return this.http
      .get(`${this.scoreboardLevelsAPI}/level`, {
        params: { score: score.toString() },
        responseType: 'text', // not json
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.error(`Error fetching level name for score ${score}`, err);
          return throwError(err);
        })
      );
  }
}
