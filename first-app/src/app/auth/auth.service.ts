import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { pipe, throwError, BehaviorSubject } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from './user.model';
//This will be swaped when you are deploying you are code for production
//Angular will take care of this for you
import { environment } from '../../environments/environment';

//Refer the documentation on what response you are getting back
//After referring you will get to know what you get back along with the
//return type
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //BehaviorSubject is used to get the previous value before the subscription
  user = new BehaviorSubject<User>(null);
  timeOutReference: any;
  constructor(private http: HttpClient) {}

  signUp(email: string, password:string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
      }));
  }

  login(email: string, password: string) {
    //Check the firebase https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password for complete understanding
    //of the below methods
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
   }).pipe(catchError(this.handleError), tap(resData => {
     this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
   }));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This eamil exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage="This password is not correct."
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, token: string, expiresIn: number, userId: string) {
    //getTime in miliseconds , expiresIn is in seconds and convert it to milliseconds to add
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    //Number is in milliseconds
    this.autoLogout(expiresIn * 1000);
    //Store it in a localstorage:
    //JSON converts object to string
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    //If the expiration date is in the future
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.timeOutReference) {
      clearTimeout(this.timeOutReference);
    }
    this.timeOutReference = null;
  }

  autoLogout(expirationDuration: number) {
    this.timeOutReference = setTimeout(() => {
        this.logout();
      },
      expirationDuration);
  }
}
