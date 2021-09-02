import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as recipeActions from "./store/recipes.action"
import { Actions, ofType } from '@ngrx/effects';
import { Recipe } from './recipe.model';
import * as fromApp from "src/app/store/app.reducer";
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>, private action$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipesService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    console.log('here 1')
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        console.log('here 2')
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        console.log('here 3')
        if (recipes.length === 0) {
          console.log('here 4')
          this.store.dispatch(new recipeActions.FetchRecipe());
          return this.action$.pipe(ofType(recipeActions.SET_RECIPE), take(1));
        }
        else {
          console.log('here 5')
          return of(recipes);
        }
      })
    )
  }
}
