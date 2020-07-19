import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Tomotoes", 10)
  ];
 

  constructor() { }

  ngOnInit() {
  }

  onAddClicked = (ingredient: Ingredient) => {
    if (!!ingredient.name && !!ingredient.amount)
      this.ingredients.push(ingredient);
  }

}
