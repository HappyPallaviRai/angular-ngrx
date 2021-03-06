import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipes.action';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import * as fromApp from "../../store/app.reducer";
import { Store } from '@ngrx/store';
@Injectable()
export class RecipesEffects {
    @Effect()
    fetchRecipes = this.action$.pipe(ofType(RecipeActions.FETCH_RECIPE),
        switchMap(() => {
            return this.http
                .get<Recipe[]>("https://recipebook-261a6.firebaseio.com/recpes.json")
        }),
        map((recipes) => {
            return recipes.map((recipe) => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
            });
        }),
        map((recipes) => {
            return new RecipeActions.SetRecipe(recipes)
        }))

    @Effect({ dispatch: false })
    storeRecipes = this.action$.pipe(ofType(RecipeActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http
                .put("https://recipebook-261a6.firebaseio.com/recpes.json",
                    recipesState.recipes)
        })
    )
    constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
