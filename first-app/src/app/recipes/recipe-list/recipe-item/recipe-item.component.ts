import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../../recipe.model";

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;
  @Output() recipeDetail = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }


  onRecipeClick = (recipe: Recipe) => {
    this.recipeDetail.emit(recipe);
  }
}
