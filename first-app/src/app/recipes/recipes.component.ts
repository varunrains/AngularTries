import {Component, OnInit} from '@angular/core';
import { Recipe } from "./recipe.model";
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})

export class RecipesComponent implements OnInit{
  recipeDetail: Recipe;

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeDetail = recipe;
    });
  }

  constructor(private recipeService: RecipeService){}

  //recipeDetailHandler = (recipe: Recipe) => {
  //  this.recipeDetail = recipe;
  //}
}
