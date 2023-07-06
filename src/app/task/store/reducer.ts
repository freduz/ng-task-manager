import { Action, createReducer, on } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';
import {
  addTaskAction,
  addTaskFailureTask,
  addTaskSuccessAction,
} from './actions/task.actions';

export const initialState: ITaskState = {
  tasks: [],
  isLoading: false,
  isSaving: false,
  errors: undefined,
};

export const taskFeatureKey = 'tasks';

const taskReducer = createReducer(
  initialState,
  on(
    addTaskAction,
    (state): ITaskState => ({
      ...state,
      isSaving: true,
    })
  ),
  on(
    addTaskSuccessAction,
    (state, { task }): ITaskState => ({
      ...state,
      isSaving: false,
      tasks: [...state.tasks, task],
    })
  ),
  on(
    addTaskFailureTask,
    (state, { errors }): ITaskState => ({
      ...state,
      isSaving: false,
      errors: errors,
    })
  )
);

export function reducers(state: ITaskState, action: Action) {
  return taskReducer(state, action);
}
