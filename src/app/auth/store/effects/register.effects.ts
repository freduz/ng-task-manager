import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/types/app-state.interface';
import { AuthService } from '../../service/auth.service';
import {
  registerUserAction,
  registerUserFailureAction,
  registerUserSuccessAction,
} from '../actions/register.actions';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IRegisterResponse } from '../../types/register-response.interface';

@Injectable()
export class RegisterEffects {
  registerEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerUserAction),
      switchMap(({ userData }) => {
        return this._authService.register(userData).pipe(
          map((response: IRegisterResponse) => {
            this._notificationService.showSuccess(response.message);
            return registerUserSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            this._store.dispatch(registerUserFailureAction());
            return throwError(err);
          })
        );
      })
    )
  );

  redirectAfterRegister$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(registerUserSuccessAction),
        tap((_) => this._router.navigate(['auth', 'login']))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _store: Store<IAppState>,
    private _actions$: Actions,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}
}
