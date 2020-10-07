import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { AuthService } from './auth.service';
import {  finalize } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { EntityHelper } from "../helpers/EntityHelper";
import { Token } from "../models/Token.model";
import { Router } from '@angular/router';

//Not providing the 'providedIn' root 
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }
  count = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var tokenDetails = <Token>JSON.parse(localStorage.getItem(EntityHelper.LocalStorageToken));
    var checkIfRequestIsForGettingAccessToken = (req.url.indexOf('/token') > 0);
    if (!this.checkIfTokenIsExpired(tokenDetails) && !checkIfRequestIsForGettingAccessToken) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    //Explanation: With each http request, the value of ‘count’ increases and the spinner is shown and when a response is received,
    //  the ‘count’ reduces by one.When all the http requests are finished(either successfully or with an error ),
    //the value of ‘count’ reaches zero and the spinner is hid.
    const request = checkIfRequestIsForGettingAccessToken
      ? req
      : req.clone({
        setHeaders: { 'Authorization': 'Bearer ' + tokenDetails.userToken }
      });

    this.count++;
    this.spinner.show();
    return next.handle(request).pipe(finalize(() => {
      this.count--;
      
      if (this.count === 0)
        this.spinner.hide();
    }));
  }

  checkIfTokenIsExpired(tokenDetails: Token) {
    if (!tokenDetails || !tokenDetails.tokenExpirationDate || new Date() > new Date(tokenDetails.tokenExpirationDate)) {
      return null;
    } else {
      return tokenDetails.userToken;
    }
  }
}
