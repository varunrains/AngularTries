import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  
  //@ViewChild('ngname', { static: false }) ngname: ElementRef;
  //@ViewChild('ngamount', { static: false }) ngamount: ElementRef;

  @ViewChild('localRef', { static: false }) formRef: NgForm;

  onShoppingListEditSubscription: Subscription;
  editMode: boolean = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.onShoppingListEditSubscription = this.shoppingListService.onShoppingListEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.formRef.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  addIngredient = (form: NgForm) => {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
      
    } else {
      this.shoppingListService.onIngredientsAdded([newIngredient]);
    }

    this.formRef.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.formRef.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    //To avoid memory leaks and this  is not managed by angular
    this.onShoppingListEditSubscription.unsubscribe();
  }
}
