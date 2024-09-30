import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, forkJoin, switchMap, map, catchError, throwError} from 'rxjs';
import {PaginatedUsers, UserScoresDTO} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  private usersAPI = 'http://localhost:8080/api/users';
  private usersScoresAPI = 'http://localhost:8081/api/userScores';
  private scoreboardLevelsAPI = 'http://localhost:8081/api/scoreboardLevels';


  constructor(private http: HttpClient) {}

  getScoreboard(page: number, size: number): Observable<any[]> {
    return this.http.get<PaginatedUsers>(`${this.usersAPI}/allUsersPaginated?page=${page}&size=${size}`).pipe(
      switchMap(users => {
        const scoreRequests = users.content.map(user => {
          // console.log('User before score request:', user);

          return this.http.get<UserScoresDTO>(`${this.usersScoresAPI}/${user.id}`);
        });

        return forkJoin(scoreRequests).pipe(
          map(scores => {
            return users.content.map((user, index) => ({
              firstName: user.firstName,
              lastName: user.lastName,
              score: scores[index]?.score || 0, // Set to 0 if no score found
              levelName: this.getLevelName(scores[index]?.score || 0)
            }));
          })
        );
      })
    );
  }

  // private getLevelName(score: number): Observable<string> {
  //   return this.http.get<string>(`${this.scoreboardLevelsAPI}/level/${score}`)
  //     .pipe(
  //       catchError(err => {
  //         console.error('Error fetching level name', err);
  //         return throwError(err);
  //       })
  //     );
  // }

  private getLevelName(score: number): string {
    if (score <= 150) {
      return 'Explorer';
    } else if (score < 300) {
      return 'Dynamo';
    } else if (score < 450) {
      return 'Pioneer';
    } else if (score < 600) {
      return 'Legend';
    } else {
      return 'Guru';
    }
  }

}
