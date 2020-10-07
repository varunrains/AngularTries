import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityHelper } from "./helpers/EntityHelper";
import { Observable } from 'rxjs';
import { Match } from "./models/match.model";
import { Bet } from "./models/bet.model";
import { User } from "./models/user.model";

@Injectable({providedIn:'root'})
export class BettingService {
  private matchDetailUrl: string = EntityHelper.serviceUrl + "api/matches/GetMatchDetails";
  private betUrl: string = EntityHelper.serviceUrl + "api/bets/AddBet";
  private bettingHistoryUrl: string = EntityHelper.serviceUrl + 'api/bets/GetBettingHistory';
  private currentBetsUrl: string = EntityHelper.serviceUrl + 'api/bets/GetCurrentBets';
  private updateBetsUrl: string = EntityHelper.serviceUrl + 'api/bets/UpdateBet';
  private changePasswordUrl: string = EntityHelper.serviceUrl + 'api/users/ChangePassword';
  //Admin
  private adminMatchDetailUrl: string = EntityHelper.serviceUrl + "api/admin/GetMatchDetails";
  private adminUpdateResultUrl: string = EntityHelper.serviceUrl + "api/admin/UpdateResult";
  private adminAddUserUrl: string = EntityHelper.serviceUrl + "api/admin/AddUser";
  private adminRemoveAllBetsUserUrl: string = EntityHelper.serviceUrl + "api/admin/RemoveAllBets";
  constructor(private http: HttpClient) {

  }

  getMatchDetails = (): Observable<Match[]> => {
   return this.http.get<Match[]>(this.matchDetailUrl);
  }

  addBet = (betData: Bet): Observable<Bet> => {
    return this.http.post<Bet>(this.betUrl, betData);
  }

  getBettingHistory = (): Observable<Bet[]> => {
    return this.http.get<Bet[]>(this.bettingHistoryUrl);
  }

  getCurrentBets = (): Observable<Bet[]> => {
    return this.http.get<Bet[]>(this.currentBetsUrl);
  }

  updateBet = (betData: Bet): Observable<Bet> => {
    return this.http.put<Bet>(this.updateBetsUrl, betData);
  }

  //Admin
  updateMatchResult = (matchData: Match) => {
    return this.http.put(this.adminUpdateResultUrl, matchData);
  }

  addUser = (userData: User) => {
    return this.http.post(this.adminAddUserUrl,userData);
  }

  getAdminMatchDetails = (): Observable<Match[]> => {
    return this.http.get<Match[]>(this.adminMatchDetailUrl);
  }

  removeAllBets = (): Observable<any> => {
    return this.http.get(this.adminRemoveAllBetsUserUrl);
  }

  changePassword = (userPasswordData: any): Observable<any> => {
    return this.http.put(this.changePasswordUrl, userPasswordData);
  }

}
