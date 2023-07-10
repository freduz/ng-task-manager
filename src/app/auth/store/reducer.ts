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
import { logoutSuccessAction } from './actions/logout.actions';

export const authFeatureKey = 'auth';

const initialState: IAuthState = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: false,
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
      currentUser: authResponse,
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
      currentUser: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        accessToken: '',
      },
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
  ),
  on(logoutSuccessAction, (state): IAuthState => initialState)
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
