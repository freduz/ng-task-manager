import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { ILoginRequest } from '../../types/login-request.interface';
import { ILoginResponse } from '../../types/login-response.interface';
import { IUser } from '../../types/user.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ loginRequest: ILoginRequest }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ authResponse: ILoginResponse }>()
);

export const loginFailureAction = createAction(ActionTypes.LOGIN_FAILURE);

export const currentUserAction = createAction(ActionTypes.GET_CURRENT_USER);
export const currentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
);
export const currentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: IUser }>()
);
