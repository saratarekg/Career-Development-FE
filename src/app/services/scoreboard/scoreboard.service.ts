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
import {PaginatedScoreboardLevelsDTO, ScoreboardLevelsDTO} from "../../models/scoreboardDTO";

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  private usersAPI = environment.usersAPI;
  private usersScoresAPI = environment.usersScoresAPI;
  private scoreboardLevelsAPI = environment.scoreboardLevelsAPI;

  constructor(private http: HttpClient) {}

  addScoreboardLevel(scoreboardLevelsDTO: ScoreboardLevelsDTO): Observable<string> {
    return this.http.post<string>(this.scoreboardLevelsAPI, scoreboardLevelsDTO,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      });
  }

  updateScoreboardLevel(id: string, scoreboardLevelsDTO: ScoreboardLevelsDTO): Observable<string> {
    return this.http.put<string>(`${this.scoreboardLevelsAPI}/${id}`, scoreboardLevelsDTO,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      });
  }

  deleteScoreboardLevel(id: string): Observable<string> {
    return this.http.delete<string>(`${this.scoreboardLevelsAPI}/${id}`,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      });
  }

  getAllScoreboardLevels(page: number, size: number): Observable<PaginatedScoreboardLevelsDTO> {
    return this.http.get<PaginatedScoreboardLevelsDTO>(`${this.scoreboardLevelsAPI}/all?page=${page}&size=${size}`, {
      withCredentials: true
    });
  }



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


  calculateUserScore(userId: string): void {
    this.http.put<string>(`${this.usersScoresAPI}/calculate/${userId}`, null, {
      withCredentials: true,
    }).subscribe({
      next: (response) => {
        console.log('User score calculation successful:', response);
      },
      error: (error) => {
        console.error('Error calculating user score:', error);
      }
    });
  }

}
