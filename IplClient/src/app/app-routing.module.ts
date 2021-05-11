import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBetComponent } from "./main-bet/main-bet.component";
import { BetHistoryComponent } from "./bet-history/bet-history.component";
import { EditBetComponent } from "./edit-bet/edit-bet.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',canActivate:[AuthGuard], component: MainBetComponent },
  { path: 'history', canActivate: [AuthGuard], component: BetHistoryComponent },
  { path: 'editBet', canActivate: [AuthGuard], component: EditBetComponent },
  { path: 'leaderboard', canActivate: [AuthGuard], component: LeaderboardComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(adminModule => adminModule.AdminModule) },
  { path: 'changePassword', canActivate: [AuthGuard], component: ChangePasswordComponent  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
