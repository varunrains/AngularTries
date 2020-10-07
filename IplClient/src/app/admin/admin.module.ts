import {NgModule } from '@angular/core';
import { HttpInterceptorService } from "../login/http.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UpdateResultComponent } from "./update-result/update-result.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AdminRoutingModule } from "./admin.routing.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateResultComponent,
    AddUserComponent
  ],
  imports: [AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }]
})
export class AdminModule { }
