import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { pipe, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from "../models/user.model";
import { EntityHelper } from "../helpers/EntityHelper";
import { Token } from "../models/Token.model";

export interface ITokenDetails {
  access_token: string;
  expires_in: string;
  token_type: string;
}

//export interface UserDataResponse {
//  UserName: string;
//  UserToken: string;
//  DisplayName: string;
//  UserGroup: string;
//  UserAmount: number;
//  IsAllowedToBet: boolean;
//  TokenExpirationDate: string;
//}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {  }
  user = new BehaviorSubject<User>(null);
  tokenId: string = null;
  expirationInSeconds: number = null;
  private tokenUrl: string = EntityHelper.serviceUrl +"token";
  private getUserDetails: string = EntityHelper.serviceUrl + "api/users/getuserdetails";


  getAccessToken = (userName: string, password: string) => {
    let model = "username=" + userName + "&password=" + password + "&grant_type=" + "password";
   return this.http.post<ITokenDetails>(this.tokenUrl,model).pipe(catchError(this.handleError), tap(responseData => {
     this.handleTokenData(responseData.access_token, +responseData.expires_in); 
    }));
  }
  //catchError(this.handleError),
  login() {
    return this.http.get<User>(this.getUserDetails).pipe(tap(user => {
      if (!!user) {
        this.user.next(user);
        localStorage.setItem(EntityHelper.LocalStorageUser, JSON.stringify(user));
      }
    }));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    
    return throwError(errorResponse);
  }

  //private handleAuthentication(usr: User) {
  //  //getTime in miliseconds , expiresIn is a string and in milliseconds
  //  const expirationDate = new Date(new Date().getTime() + this.expirationInSeconds * 1000);
    
  //  const user = new User(usr.UserName,this.tokenId,usr.DisplayName,usr.UserGroup,usr.UserAmount,usr.IsAllowedToBet,expirationDate);
  //  this.user.next(user);
  //  //Store it in a localstorage:
  //  //JSON converts object to string
  //  localStorage.setItem('userData', JSON.stringify(user));
  //}

  private handleTokenData(token: string, expirationDateInSeconds:number) {
    //getTime in miliseconds , expiresIn is a string and in milliseconds
    const expirationDate = new Date(new Date().getTime() + expirationDateInSeconds * 1000);

    const tokenDetails = new Token(token, expirationDate);
    localStorage.setItem(EntityHelper.LocalStorageToken, JSON.stringify(tokenDetails));
  }

  logout() {
    localStorage.clear();
    this.user.next(null);
  }

}
