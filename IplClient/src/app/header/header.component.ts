import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from './header.service';
import { AuthService } from "../login/auth.service";
import { User } from "../models/user.model";
import { EntityHelper } from "../helpers/EntityHelper";
import { WebNotificationService } from "./webnotification.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSideNavVisible: boolean = false;
  onCloseSubscription: Subscription;
  userInformation: User;
  userWalletAmount: number = 0;

  constructor(private headerService: HeaderService, private authService: AuthService, private router: Router, private webNotificationService: WebNotificationService) {
  }

  ngOnInit(): void {
    this.onCloseSubscription = this.headerService.closeSideNavigation.subscribe(() => {
      this.isSideNavVisible = false;
    });
    this.authService.user.subscribe(data => {
      //In case of page refresh, take the user data from localstorage.
      if (!data) {
        this.userInformation = EntityHelper.getUserDetails();
        return;
      }
      this.userInformation = data;
    });
    this.webNotificationService.checkAndReloadAppUpdate();
  }

  isUserSubscribedForNotification = () => {
    return this.webNotificationService.isUserSubscribedForNotification();
  }

  getWalletAmount() {
    var userDetail = EntityHelper.getUserDetails();
    if (userDetail) {
      return userDetail.UserAmount.toFixed(2);
    } else {
      return 0;
    }

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSideBar() {
    this.isSideNavVisible = !this.isSideNavVisible;
  }

  onHomeClick() {
    this.router.navigate(['/home']);
  }

  subscribeForNotification(): void {
    this.webNotificationService.subscribeToNotification();
  }

  ngOnDestroy(): void {
    this.onCloseSubscription.unsubscribe();
  }

}