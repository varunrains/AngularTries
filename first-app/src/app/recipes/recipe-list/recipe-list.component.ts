import {Component, Output, EventEmitter}  from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls:['./recipe-list.component.css']
})

export class RecipeListComponent {
  @Output() recipeDetails = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("A test recipe", "This is description", "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg"),
    new Recipe("A second one", "This is again description", "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg")
  ];

  onRecipeClick = (recipe: Recipe) => {
   
  }

  onRecipeDetailHandler = (recipe: Recipe) => {
    this.recipeDetails.emit(recipe);
  }
}
