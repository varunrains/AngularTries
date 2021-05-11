import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BettingService } from "../../betting.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from "../../models/notification.model";

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent {

  constructor(private bettingService: BettingService, private snackBar: MatSnackBar) { }

  send = (formRef: NgForm) => {
    var notificationData = new Notification(formRef.value.title, formRef.value.body, formRef.value.icon);
    this.bettingService.sendNotification(notificationData).subscribe(() => {
      this.openSnackBar("Notifications Sent Successfully!", "Ok");
      formRef.resetForm();
    }, (error) => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
        formRef.resetForm();
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
