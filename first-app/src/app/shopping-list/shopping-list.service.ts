import { Ingredient } from "../shared/ingredient.model";
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

  //ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientAdded = new Subject<Ingredient[]>();
  onShoppingListEditing = new Subject<number>();

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
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
