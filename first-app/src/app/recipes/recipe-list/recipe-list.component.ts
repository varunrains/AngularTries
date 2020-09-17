import {Component, OnInit, OnDestroy}  from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
  
})

export class RecipeListComponent implements  OnInit, OnDestroy{
  recipes: Recipe[];
  recipeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.recipeChangedSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();

  }

  createRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }
}
