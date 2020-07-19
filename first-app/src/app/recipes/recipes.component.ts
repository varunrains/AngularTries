import {Component} from '@angular/core';
import { Recipe } from "./recipe.model";

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls:['./recipes.component.css']
})

export class RecipesComponent {
  recipeDetail: Recipe;
  recipeDetailHandler = (recipe: Recipe) => {
    this.recipeDetail = recipe;
  }
}
