import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersistanceService } from 'src/app/core/services/persistence.service';
import { map, tap } from 'rxjs';
import { logoutAction, logoutSuccessAction } from '../actions/logout.actions';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/types/app-state.interface';
import { taskStateResetAction } from 'src/app/task/store/actions/task.actions';

@Injectable()
export class LogoutEffects {
  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutAction),
      map(() => {
        this._persistenceService.set('accessToken', '');
        this._store.dispatch(taskStateResetAction());
        return logoutSuccessAction();
      })
    )
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logoutSuccessAction),
        tap((_) => this._router.navigate(['auth', 'login']))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _router: Router,
    private readonly _persistenceService: PersistanceService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
