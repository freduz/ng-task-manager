import { Action, createReducer, on } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';
import {
  addTaskAction,
  addTaskFailureTask,
  addTaskSuccessAction,
  loadAllTasksAction,
  loadAllTasksSuccessAction,
} from './actions/task.actions';

export const initialState: ITaskState = {
  tasks: [],
  isLoading: false,
  isSaving: false,
  tasksLoaded: false,
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
    (state): ITaskState => ({
      ...state,
      isSaving: false,
    })
  ),
  on(
    loadAllTasksAction,
    (state): ITaskState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    loadAllTasksSuccessAction,
    (state, { tasks }): ITaskState => ({
      ...state,
      tasks,
      isLoading: false,
      tasksLoaded: true,
    })
  )
);

export function reducers(state: ITaskState, action: Action) {
  return taskReducer(state, action);
}
