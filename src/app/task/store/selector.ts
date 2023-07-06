import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';

const taskFeatureSelector = createFeatureSelector<ITaskState>('tasks');

export const isSavingSelector = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.isSaving
);
