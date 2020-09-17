import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
//By this way you can be sure that you wont
//type in wrong spelling and you can save time
//by correctly typing it. TYPE _ SAFETY
//import { ADD_INGREDIENT } from './shopping-list.action';
import *  as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //you should not return the same state or you should not modify the
      //original state, that will be a wrong pattern and you should not
      //do that
      return {
        ...state, //spread operator which will copy all the properties of state
        ingredients: [...state.ingredients, action.payload] //this will override the ingredients property with the existing ingredients
      };
  }
}
