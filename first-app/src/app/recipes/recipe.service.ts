import { Recipe } from "./recipe.model";
import { Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';


@Injectable({providedIn:'root'})
export class RecipeService {

 // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe("Samosa Recipe", "Perfect Indian Snack",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg"
      ,[new Ingredient("Maida",10), new Ingredient("Oil",65), new Ingredient("Jeera", 20)]),
    new Recipe("Pizza Recipe", "Perfect Italian Cusine", "https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg"
      ,[new Ingredient("Tomato", 35), new Ingredient("Cheese", 65), new Ingredient("Jalapeno", 100)])
  ];

  getRecipes(): Recipe[] {
    //only get a copy of array and not the original array
    //return this.recipes.slice();
    //this.recipesChanged.next(this.recipes.slice());
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.getRecipes()[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
