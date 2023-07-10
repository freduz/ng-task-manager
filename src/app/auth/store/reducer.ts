import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../types/auth-state.interface';
import {
  currentUserAction,
  currentUserFailureAction,
  currentUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.actions';

export const authFeatureKey = 'auth';

const initialState: IAuthState = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: false,
  accessToken: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    loginSuccessAction,
    (state, { authResponse }): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: {
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        email: authResponse.lastName,
      },
      accessToken: authResponse.accessToken,
    })
  ),
  on(
    loginFailureAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
    })
  ),
  on(
    currentUserAction,
    (state): IAuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    currentUserSuccessAction,
    (state, { currentUser }): IAuthState => ({
      ...state,
      currentUser,
      isLoading: false,
      isLoggedIn: true,
    })
  ),
  on(
    currentUserFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
    })
  )
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
