import {HttpClient, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn:'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    //Data is stored in recipes.json folder in FIREBASE
    this.http.put('https://receipebookfirstapp.firebaseio.com/recipes.json', recipes).subscribe(response => console.log(response));
  }

  fetchReceipes() {
    //take(1)-->Only take one value from the observable and then unsubscibe it immediately
    //exhaustMap --> will wait for the left operation to complete there after it gives us the output
    //of the previous observable
    return this.http.get<Recipe[]>('https://receipebookfirstapp.firebaseio.com/recipes.json').pipe(
      map(response => {
        return response.map((recipe) => {
          return { ...recipe, 'ingredients': recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
   //return this.http.get<Recipe[]>('https://receipebookfirstapp.firebaseio.com/recipes.json')
   //   .pipe(map(response => {
   //       return response.map((recipe) => {
   //         return { ...recipe, 'ingredients': recipe.ingredients ? recipe.ingredients : [] };
   //       });
   //     }),
   //     tap(recipes => {
   //       this.recipeService.setRecipes(recipes);
   //     }));
    //  .subscribe(recipes => {
    //  this.recipeService.setRecipes(recipes);
    //});
  
}
