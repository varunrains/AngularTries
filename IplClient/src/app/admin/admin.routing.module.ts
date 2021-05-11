import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../login/auth.guard";
import { AddUserComponent } from "./add-user/add-user.component";
import { UpdateResultComponent } from "./update-result/update-result.component";
import { SendNotificationComponent } from './send-notification/send-notification.component';

const routes: Routes = [
  {
    path: 'addUser', component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateResult', component: UpdateResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sendnotification', component: SendNotificationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
