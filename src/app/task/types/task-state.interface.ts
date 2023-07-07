import { IErrorResponse } from './error-response.interface';
import { ITaskResponse } from './task-response.interface';
import { ITask } from './task.interface';

export interface ITaskState {
  tasks: ITaskResponse[];
  isLoading: boolean;
  isSaving: boolean;
  tasksLoaded: boolean;
}
