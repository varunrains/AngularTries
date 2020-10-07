import { Component, OnInit } from '@angular/core';
import { EntityHelper } from "../helpers/EntityHelper";
import { BettingService } from "../betting.service";
import { NgForm } from '@angular/forms';
import { AuthService } from "../login/auth.service";
import { User } from "../models/user.model";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private bettingService: BettingService, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  updatePassword(formRef: NgForm) {
    var currentPassword = formRef.value.currentpassword;
    var newPassword = formRef.value.newpassword;

    if (currentPassword === newPassword) {
      this.openSnackBar("Current and New Passwords are Same!!", "Ok");
      return;
    }

    var userData: any = {
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    };

    this.bettingService.changePassword(userData).subscribe(success => {
      this.openSnackBar("Password Updated! Please re-login!", "Ok");
      this.authService.logout();
      this.router.navigate(['/login']);
    },
      error => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
        this.resetFormData(formRef);
      });
  }


  private resetFormData = (formRef: NgForm) => {
    formRef.resetForm();
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
