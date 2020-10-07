import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { User } from "../models/user.model";
import { EntityHelper } from "../helpers/EntityHelper";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayForgotPasswordLabel: boolean;
  error:boolean = false;
  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    var userDetails = <User>JSON.parse(localStorage.getItem(EntityHelper.LocalStorageUser));
    if (!!userDetails) {
      this.router.navigate(['/home']);
    }
  }

  login = (formRef: NgForm) =>{
    this.error = false;
    if (formRef.invalid) return;
    this.authService.getAccessToken(formRef.value.username, formRef.value.password).subscribe(() => {
      this.authService.login().subscribe(() => {
        this.router.navigate(['/home']);
      }, this.handleError);
    }, this.handleError);
  }

  handleError = (errorMessage: string)=> {
   // this.error = errorMessage;
   console.log(errorMessage);
    this.error = true;
  }

  clearError= () => {
    this.error = false;
  }

  onForgotPasswordClick() {
    this.displayForgotPasswordLabel = !this.displayForgotPasswordLabel;
  }

}
