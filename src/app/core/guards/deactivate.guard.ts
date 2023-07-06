import { CanDeactivateFn } from '@angular/router';
import { AddTaskComponent } from 'src/app/task/components/add-task/add-task.component';

export const deactivateGuard: CanDeactivateFn<AddTaskComponent> = (
  component: AddTaskComponent,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canExit();
};
