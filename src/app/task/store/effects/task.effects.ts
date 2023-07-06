import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../service/task.service';
import {
  addTaskAction,
  addTaskFailureTask,
  addTaskSuccessAction,
} from '../actions/task.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ITask } from '../../types/task.interface';
import { ITaskResponse } from '../../types/task-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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
          catchError((error: HttpErrorResponse) => {
            return of(addTaskFailureTask({ errors: error.error }));
          })
        );
      })
    )
  );

  afterSuccessFullAddEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addTaskSuccessAction),
        tap(() => {
          this._toastrService.showSucces('Your task added successfully!');
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _actions$: Actions,
    private _taskService: TaskService,
    private _toastrService: ToasterService
  ) {}
}
