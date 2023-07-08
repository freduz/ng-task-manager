import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { IRouterStateUrl } from './types/router-state.interface';

export const routerFeatureState =
  createFeatureSelector<RouterReducerState<IRouterStateUrl>>('router');

export const getCurrentRouteState = createSelector(
  routerFeatureState,
  (state) => state.state
);
