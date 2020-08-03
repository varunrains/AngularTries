import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipeSection: boolean = true;
  showShoppingListSection: boolean;

  //headerClickHandler = (inputData: any) => {
  //  if (inputData.clickType === "recipe") {
  //    this.showRecipeSection = true;
  //  } else if (inputData.clickType === "shopping") {
  //    this.showShoppingListSection = true;
  //    this.showRecipeSection = !this.showRecipeSection;
  //  }
  //}
}
