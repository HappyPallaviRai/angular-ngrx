import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListAction from "./shopping-list.action";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
const intialState: ShoppingListState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};
export function ShoppingListReducer(
  state: ShoppingListState = intialState,
  action: ShoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state, //adding existing state
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state, //adding existing state
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state, //adding existing state
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state, //adding existing state
        ingredients: state.ingredients.filter((ig, index) => {
          return index != state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state, //adding existing state
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state, //adding existing state
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
