import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './types/app-state.interface';
import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
};
