import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}
const initialState: State = {
  user: null,
  authError: null,
  isLoading: false,
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {
        ...state,
        user: new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate
        ),
        authError: null,
        isLoading: true,
      };
    }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        authError: action.payload,
        isLoading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
