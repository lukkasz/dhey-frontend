import * as AuthActions from './auth.action';

export interface State {
  isAuth: boolean,
  token: string,
  authError: string,
  loading: boolean
}

const initialState = {
  isAuth: false,
  token: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch(action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        token: action.payload.token,
        authError: null,
        loading: false
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        isAuth: false,
        token: null,
        authError: action.payload,
        loading: false
      }
    default:
      return state
  }
}