import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  //You can also do this by accessing the recipeService and from their add the ingredients to the shoppinglist-service
  listClickHandler = (ingredients: Ingredient[]) => {
      this.shoppingListService.onIngredientsAdded(ingredients);
  }
}
