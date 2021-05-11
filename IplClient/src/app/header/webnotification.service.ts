import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { EntityHelper } from "../helpers/EntityHelper";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BettingService } from '../betting.service';
import { SwUpdate } from '@angular/service-worker';

@Injectable({providedIn:'root'})
export class WebNotificationService {

  constructor(
    private swPush: SwPush, private snackBar: MatSnackBar, private bettingService: BettingService, private swUpdate: SwUpdate) {

    this.swPush.notificationClicks.subscribe(notpayload => {
      window.open(EntityHelper.UI_Url, "_blank");
    });
  }

  isUserSubscribedForNotification = () => {
    return this.swPush.isEnabled && Notification.permission === 'granted';
  }

  subscribeToNotification =() =>{
    this.swPush.requestSubscription({
      serverPublicKey: EntityHelper.VAPID_PUBLIC_KEY
    })
      .then(sub => this.sendToServer(JSON.stringify(sub)))
      .catch(err => {
        if (Notification.permission === 'denied') {
          this.openSnackBar("Looks like you have blocked notifications from this site", "Check settings")
        }
        this.openSnackBar("Error occured. During subscription!!", "Ok")
      }
    );
  }

  sendToServer = (subscriptionObject: any) => {
    this.bettingService.subscribeForNotification(subscriptionObject).subscribe(() => {
      this.openSnackBar("Hurray!! You will be notified with Updates!!", "Ok");
      window.location.reload();
    }, error => {
      this.openSnackBar("Error occured. During subscription!!", "Ok");
    });
  }

  checkAndReloadAppUpdate = () => {
    this.swUpdate.available.subscribe(evt => {
      window.location.reload();
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  
}
