import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { IRegisterRequest } from '../../types/register-request.interface';

export const registerUserAction = createAction(
  ActionTypes.REGISTER_USER,
  props<{ userData: IRegisterRequest }>()
);

export const registerUserSuccessAction = createAction(
  ActionTypes.REGISTER_USER_SUCCESS
);

export const registerUserFailureAction = createAction(
  ActionTypes.REGISTER_USER_FAILURE
);
