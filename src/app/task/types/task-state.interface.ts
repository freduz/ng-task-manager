import { IErrorResponse } from './error-response.interface';
import { ITask } from './task.interface';

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  isSaving: boolean;
  tasksLoaded: boolean;
}
