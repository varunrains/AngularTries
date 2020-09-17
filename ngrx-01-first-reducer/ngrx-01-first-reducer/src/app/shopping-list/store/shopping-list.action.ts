import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  //You cannot edit this property from outside
  //The Action interface only forces to you add a "type" property
  // and not the "payload" 
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;


}
