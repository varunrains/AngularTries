import {Component, OnInit} from '@angular/core';
import { Recipe } from "./recipe.model";
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //If you navigate to shopping component and then come back to recipe componenet then the recipe service will be new
  //providers:[RecipeService]
  
})

export class RecipesComponent implements OnInit{
  recipeDetail: Recipe;

  ngOnInit(): void {
    //this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //  this.recipeDetail = recipe;
    //});
  }

  constructor(private recipeService: RecipeService){}

  //recipeDetailHandler = (recipe: Recipe) => {
  //  this.recipeDetail = recipe;
  //}
}
