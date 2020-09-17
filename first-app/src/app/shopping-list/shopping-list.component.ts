import { Component, OnInit , OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  //providers: [LoggingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {
   this.subscription =  this.shoppingListService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients.concat(ingredients);
    });
  }

  //All initialization in ngInit is a good practice
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.loggingService.printLog('Hello from Shopping List component ngOnInit');
  }

  onEditItem(index: number) {
    this.shoppingListService.onShoppingListEditing.next(index);
  }

  //As we are using Subject to emit the event, we need to manually destroy the subscription to avoid the memory leak in the application
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
