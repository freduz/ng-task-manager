import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from '../types/task-state.interface';
import { getCurrentRouteState } from 'src/app/store/router.sector';
import { ITaskResponse } from '../types/task-response.interface';
import { IRouterStateUrl } from '../../store/types/router-state.interface';

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

export const isUpdating = createSelector(
  taskFeatureSelector,
  (state: ITaskState) => state.isUpdating
);

export const getTaskByIdSelector = createSelector(
  tasksSelector,
  getCurrentRouteState,
  (tasks: ITaskResponse[], router: IRouterStateUrl) => {
    return tasks.find((task) => task.id == router.params?.id);
  }
);
