import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "./auth-guard.service";
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

//Router should be registered
const appRoutes: Routes = [
  //locahost:4200 is a empty path 
  { path: '', component: HomeComponent },
  // localhost:4200/users
  {
    path: 'users', component: UsersComponent, children: [
      // localhost:4200/users/id of the user
      { path: ':id/:name', component: UserComponent }
    ]
  },
  // localhost:4200/servers
  {
    path: 'servers',
   // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent, children: [
      // localhost:4200/servers/5
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      // localhost:4200/servers/5/edit
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }]
  },
  //All possible wrong URL's ? To catch all the routes
  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {'message': "Page not found buddy!!"} },
  //Catch all the routes which is not knows
  //The order is super important. This route should be at the last
  //If you place it first then you will always be re-directed to
  //not-found page.
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    //RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {
  }
