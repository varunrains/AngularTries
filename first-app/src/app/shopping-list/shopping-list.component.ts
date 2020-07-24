import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit {
  
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients.concat(ingredients);
    });
  }

  //All initialization in ngInit is a good practice
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
