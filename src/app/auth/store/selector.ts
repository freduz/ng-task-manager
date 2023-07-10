import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../types/auth-state.interface';

const authStateFeatureSelector = createFeatureSelector<IAuthState>('auth');

export const isLoggedIn = createSelector(
  authStateFeatureSelector,
  (state: IAuthState) => state.isLoggedIn
);
