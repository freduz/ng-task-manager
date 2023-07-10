import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../service/auth.service';
import {
  currentUserFailureAction,
  currentUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.actions';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { ILoginResponse } from '../../types/login-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/types/app-state.interface';
import { Router } from '@angular/router';
import { PersistanceService } from 'src/app/core/services/persistence.service';
import { ActionTypes } from '../action-types';
import { IUser } from '../../types/user.interface';

@Injectable()
export class LoginEffects {
  loginEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginAction),
      switchMap(({ loginRequest }) => {
        return this._authService.login(loginRequest).pipe(
          map((authResponse: ILoginResponse) => {
            this._persistenceService.set(
              'accessToken',
              authResponse.accessToken
            );
            return loginSuccessAction({ authResponse });
          }),
          catchError((err: HttpErrorResponse) => {
            this._store.dispatch(loginFailureAction());
            return throwError(err);
          })
        );
      })
    )
  );

  currentUserEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ActionTypes.GET_CURRENT_USER),
      switchMap((_) => {
        return this._authService.getCurrentUser().pipe(
          map((currentUser: IUser) => {
            return currentUserSuccessAction({ currentUser });
          }),
          catchError((err: HttpErrorResponse) => {
            this._store.dispatch(currentUserFailureAction());
            return throwError(err);
          })
        );
      })
    )
  );

  redirectAfterSuccessUserRetrivelEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(currentUserSuccessAction),
        tap((_) => this._router.navigate(['/task']))
      ),
    {
      dispatch: false,
    }
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this._router.navigate(['/task']);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _store: Store<IAppState>,
    private _router: Router,
    private _persistenceService: PersistanceService
  ) {}
}
