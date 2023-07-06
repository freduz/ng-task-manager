import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { ITask } from '../../types/task.interface';
import { ITaskResponse } from '../../types/task-response.interface';
import { IErrorResponse } from '../../types/error-response.interface';

export const addTaskAction = createAction(
  ActionTypes.SAVE_TASK,
  props<{ task: ITask }>()
);

export const addTaskSuccessAction = createAction(
  ActionTypes.SAVE_TASK_SUCCESS,
  props<{ task: ITaskResponse }>()
);

export const addTaskFailureTask = createAction(ActionTypes.SAVE_TASK_FAILURE);

export const loadAllTasksAction = createAction(ActionTypes.LOAD_ALL_TASKS);

export const loadAllTasksSuccessAction = createAction(
  ActionTypes.LOAD_ALL_TASKS_SUCCESS,
  props<{ tasks: ITaskResponse[] }>()
);

export const loadAllCoursesFailureAction = createAction(
  ActionTypes.LOAD_ALL_TASKS_FAILURE
);
