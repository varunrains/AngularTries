import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  //We are not gaining much in this module
  //as we are removing one module
  //and importing another module
  //If you were to import Alert, PlaceHolder or any other directives,
  //then this would come in handy
  imports: [
    //CommonModule,
    FormsModule,
    SharedModule,
    ShoppingListRoutingModule],
})
export class ShoppingListModule {

}
