import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @Output('addIngredient') addIngredient = new EventEmitter<Ingredient>();
  @ViewChild('ngname', { static: false }) ngname: ElementRef;
  @ViewChild('ngamount', { static: false }) ngamount: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addButtonClick = () => {
    this.addIngredient.emit(new Ingredient(this.ngname.nativeElement.value, this.ngamount.nativeElement.value));
  }

  onSubmit  (form: any) {
    this.addIngredient.emit();
  }

  onNgSubmit() {
    this.addIngredient.emit();
  }

}
