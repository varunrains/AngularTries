import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeListComponent,
  ],
  imports: [
    RouterModule,
    //CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecipesRoutingModule],
  //Exports are required if you dont use this in the routing
  //We are using these components in the RecipesRoutingModule
  //Hence we dont need these exports here.
  //exports: [
  //  RecipeDetailComponent,
  //  RecipeItemComponent,
  //  RecipesComponent,
  //  RecipeStartComponent,
  //  RecipeEditComponent,
  //  RecipeListComponent,
  //]
})
export class RecipesModule {

}
