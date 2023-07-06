import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';

const taskFeatureSelector = createFeatureSelector<ITaskState>('tasks');

export const errorResponseSelector = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.errors
);
