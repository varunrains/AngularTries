import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  //Path is empty because this module is lazily loaded
  //From app-routing.module when user navigates to 'shopping-list' path then
  //The shopping list module gets loaded and the path which has empty string will be route
  //which gets triggered
  { path: '', component: ShoppingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
