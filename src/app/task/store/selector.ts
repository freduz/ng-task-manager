import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';

const taskFeatureSelector = createFeatureSelector<ITaskState>('tasks');

export const isSavingSelector = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.isSaving
);

export const tasksSelector = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.tasks
);

export const isTasksLoadedSelector = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.tasksLoaded
);
