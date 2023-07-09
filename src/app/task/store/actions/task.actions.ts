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

export const loadAllTasksFailureAction = createAction(
  ActionTypes.LOAD_ALL_TASKS_FAILURE
);

export const updateTaskAction = createAction(
  ActionTypes.UPDATE_TASK,
  props<{ task: Partial<ITask>; id: number }>()
);

export const updateTaskSuccessAction = createAction(
  ActionTypes.UPDATE_TASK_SUCCESS,
  props<{ task: ITaskResponse }>()
);

export const deleteTaskAction = createAction(
  ActionTypes.DELETE_TASK,
  props<{ taskId: number }>()
);

export const deleteTaskSuccessAction = createAction(
  ActionTypes.DELETE_TASK_SUCCESS
);

export const deleteTaskFailureAction = createAction(
  ActionTypes.DELETE_TASK_FAILURE
);
