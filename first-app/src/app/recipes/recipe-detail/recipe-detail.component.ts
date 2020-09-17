import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService} from "../recipe.service";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { Router, ActivatedRoute , Params} from "@angular/router";

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private shoppingListService: ShoppingListService,private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  //You can also do this by accessing the recipeService and from their add the ingredients to the shoppinglist-service
  listClickHandler = (ingredients: Ingredient[]) => {
      this.shoppingListService.onIngredientsAdded(ingredients);
  }

  navigateToEdit() {
    //this.router.navigate(['recipes', this.id, 'edit'], { replaceUrl: true });
    //Up one level
   // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo:this.route});
  }


}
