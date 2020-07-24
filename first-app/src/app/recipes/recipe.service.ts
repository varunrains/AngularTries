import { Recipe } from "./recipe.model";
import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Samosa recipe", "Perfect Indian Snack",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg"
      ,[new Ingredient("Maida",10), new Ingredient("Oil",65), new Ingredient("Jeera", 20)]),
    new Recipe("Pizza recipe", "Perfect Italian Cusine", "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg"
      ,[new Ingredient("Tomato", 35), new Ingredient("Cheese", 65), new Ingredient("Jalapeno", 100)])
  ];

  getRecipes() {
    //only get a copy of array and not the original array
    return this.recipes.slice();
  }

}
