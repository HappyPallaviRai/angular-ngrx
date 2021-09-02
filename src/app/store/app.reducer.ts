import * as fromAuth from "../auth/store/auth.reducer";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromRecipes from "../recipes/store/recipes.reducer";

import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  ShoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  ShoppingList: fromShoppingList.ShoppingListReducer,
  recipes: fromRecipes.RecipeReducer,
};
