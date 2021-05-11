import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityHelper } from "./helpers/EntityHelper";
import { Observable } from 'rxjs';
import { Match } from "./models/match.model";
import { Bet } from "./models/bet.model";
import { User } from "./models/user.model";
import { Notification } from "./models/notification.model";

@Injectable({providedIn:'root'})
export class BettingService {
  private matchDetailUrl: string = EntityHelper.serviceUrl + "api/matches/GetMatchDetails";
  private betUrl: string = EntityHelper.serviceUrl + "api/bets/AddBet";
  private bettingHistoryUrl: string = EntityHelper.serviceUrl + 'api/bets/GetBettingHistory';
  private currentBetsUrl: string = EntityHelper.serviceUrl + 'api/bets/GetCurrentBets';
  private updateBetsUrl: string = EntityHelper.serviceUrl + 'api/bets/UpdateBet';
  private otherUsersBetUrl: string = EntityHelper.serviceUrl + 'api/bets/GetOtherUsersBets/';
  private changePasswordUrl: string = EntityHelper.serviceUrl + 'api/users/ChangePassword';
  private userSubscriptionSaveUrl = EntityHelper.serviceUrl + 'api/users/SaveUserSubscription';
  private getAmountOwnByUsersUrl: string = EntityHelper.serviceUrl + 'api/bets/GetAmountOwnByUsers/';
  private getUserWinningPercentageUrl: string = EntityHelper.serviceUrl + 'api/users/GetUserWinningPercentage';
  //Admin
  private adminMatchDetailUrl: string = EntityHelper.serviceUrl + "api/admin/GetMatchDetails";
  private adminUpdateResultUrl: string = EntityHelper.serviceUrl + "api/admin/UpdateResult";
  private adminAddUserUrl: string = EntityHelper.serviceUrl + "api/admin/AddUser";
  private adminRemoveAllBetsUserUrl: string = EntityHelper.serviceUrl + "api/admin/RemoveAllBets";
  private sendNotificationUrl: string = EntityHelper.serviceUrl + "api/admin/SendNotification";
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

  otherUsersBets = (matchId: number): Observable<Bet[]> => {
    return this.http.get<Bet[]>(this.otherUsersBetUrl.concat(matchId.toString()));
  }

  sendNotification = (notifcationData: Notification) => {
    return this.http.post(this.sendNotificationUrl, notifcationData);
  }

  subscribeForNotification = (subscriptionObject: any) => {
   return this.http.post(this.userSubscriptionSaveUrl, { subscriptionObject: subscriptionObject });
  }

  getAmountOwnByUsers = (matchId: number): Observable<Bet[]> => {
    return this.http.get<Bet[]>(this.getAmountOwnByUsersUrl.concat(matchId.toString()));
  }

  getUserWinningPercentage = (): Observable<User[]> => {
    return this.http.get<User[]>(this.getUserWinningPercentageUrl);
  }

}
