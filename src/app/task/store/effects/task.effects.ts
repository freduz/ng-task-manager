import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../service/task.service';
import {
  addTaskAction,
  addTaskFailureTask,
  addTaskSuccessAction,
  loadAllTasksAction,
  loadAllTasksSuccessAction,
  updateTaskAction,
  updateTaskSuccessAction,
} from '../actions/task.actions';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';

import { ITaskResponse } from '../../types/task-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable()
export class TaskEffects {
  addTaskEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addTaskAction),
      switchMap(({ task }) => {
        return this._taskService.create(task).pipe(
          map((task: ITaskResponse) => {
            return addTaskSuccessAction({ task });
          }),
          tap((_) => {}),
          catchError((error: HttpErrorResponse) => {
            this._store.dispatch(addTaskFailureTask());
            return throwError(error);
          })
        );
      })
    )
  );

  afterUpdateSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateTaskSuccessAction),
        tap((_) => this._notificationService.showSuccess('Task updated'))
      ),
    {
      dispatch: false,
    }
  );

  updateTaskEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateTaskAction),
      switchMap(({ task, id }) => {
        return this._taskService.updateTask(task, id).pipe(
          map((task: ITaskResponse) => {
            return updateTaskSuccessAction({ task });
          })
        );
      })
    )
  );

  loadAllTasksEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadAllTasksAction),
      switchMap((_) => {
        return this._taskService.getAll().pipe(
          map((tasks) => {
            return loadAllTasksSuccessAction({ tasks });
          })
        );
      })
    )
  );

  afterTaskAddSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addTaskSuccessAction),
        tap((_) => this._notificationService.showSuccess('Task saved success!'))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _actions$: Actions,
    private _taskService: TaskService,
    private _store: Store<IAppState>,
    private _notificationService: NotificationService
  ) {}
}
