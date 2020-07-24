import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  
  @ViewChild('ngname', { static: false }) ngname: ElementRef;
  @ViewChild('ngamount', { static: false }) ngamount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addButtonClick = () => {
    this.shoppingListService.onIngredientsAdded([new Ingredient(this.ngname.nativeElement.value, this.ngamount.nativeElement.value)]);
  }
}
