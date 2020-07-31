import { CanActivate, CanActivateChild ,Router } from '@angular/router';
import { Injectable } from "@angular/core";
import {AuthService} from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router/router";
import { Observable } from "rxjs/Observable";

@Injectable()
//Here the service is not prefixed
export class AuthGuard implements CanActivate, CanActivateChild{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |
                                 Promise<boolean> |
                                 boolean {
   return  this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
                                                                                    Promise<boolean> |
                                                                                    boolean {
    return this.canActivate(childRoute, state);
  }

}
