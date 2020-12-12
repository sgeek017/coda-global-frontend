import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = environment.restAPI;
  URL = this.apiUrl + 'leaderboard';

  // const request = request.clone({
  //   setHeaders: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  constructor(private _http: HttpClient) { }

  getAllLeaderboard() {
    return this._http.get<any[]>(this.URL);
  }

  addTeamname(team_name) {
    return this._http.post(this.URL, { team_name });
  }

  updateTeamScore(updateScores) {
    return this._http.put(this.URL, updateScores);
  }
}
