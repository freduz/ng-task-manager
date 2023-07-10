export enum ActionTypes {
  SAVE_TASK = '[Task] Add task',
  SAVE_TASK_SUCCESS = '[Task] Add task success',
  SAVE_TASK_FAILURE = '[Task] Add task failure',

  LOAD_ALL_TASKS = '[Task] Load all tasks',
  LOAD_ALL_TASKS_SUCCESS = '[Task] Load all tasks success',
  LOAD_ALL_TASKS_FAILURE = '[Task] Load all tasks failure',

  RESET_TASK_STATE = '[Task] Reset tasks',

  UPDATE_TASK = '[Task] Update task',
  UPDATE_TASK_SUCCESS = '[Task] Update task success',
  UPDATE_TASK_FAILURE = '[Task] Update task failure',

  DELETE_TASK = '[Task] Delete task',
  DELETE_TASK_SUCCESS = '[Task] Delete task success',
  DELETE_TASK_FAILURE = '[Task] Delete task failure',
}
