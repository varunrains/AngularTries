import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BettingService } from "../../betting.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from "../../models/user.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private bettingService: BettingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addUser = (formRef: NgForm) => {
    let userInfo = new User(formRef.value.username, formRef.value.username, formRef.value.password, 100, +formRef.value.role, formRef.value.usergroup);
    this.bettingService.addUser(userInfo).subscribe(resp => {
      this.openSnackBar("User added successful!", "Ok");
      this.resetFormData(formRef);
    }, error => {
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
