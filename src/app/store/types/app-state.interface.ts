import { RouterReducerState } from '@ngrx/router-store';
import { ITaskState } from 'src/app/task/types/task-state.interface';

export interface IAppState {
  tasks?: ITaskState;
  router?: RouterReducerState;
}
