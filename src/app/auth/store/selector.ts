import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../types/auth-state.interface';

const authStateFeatureSelector = createFeatureSelector<IAuthState>('auth');

export const isLoggedIn = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.isLoggedIn
);

export const isLoading = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.isLoading
);

export const CurrentUser = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.currentUser
);

export const currentUsername = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.currentUser?.firstName
);

export const isSubmitting = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.isSubmitting
);
