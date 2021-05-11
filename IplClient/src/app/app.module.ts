import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainBetComponent } from './main-bet/main-bet.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { EditBetComponent } from './edit-bet/edit-bet.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpInterceptorService } from "./login/http.interceptor";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBetComponent,
    BetHistoryComponent,
    EditBetComponent,
    LoginComponent,
    ChangePasswordComponent,
    LeaderboardComponent,
    SimpleDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
