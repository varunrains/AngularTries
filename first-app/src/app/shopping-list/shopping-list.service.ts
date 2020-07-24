import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

  ingredientAdded = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Tomotoes", 10)
  ];

  onIngredientsAdded = (ingredients: Ingredient[]) => {
    ingredients.forEach((ingredient: Ingredient) => {
    if (!!ingredient.name && !!ingredient.amount)
      this.ingredients.push(ingredient);
  });

    //slice is used to return new array and not send the reference of the original array.
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}
