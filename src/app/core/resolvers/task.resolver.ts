import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs';
import { loadAllTasksAction } from 'src/app/task/store/actions/task.actions';
import { isTasksLoadedSelector } from 'src/app/task/store/selector';

export const taskResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  let loading = false;
  return store.pipe(
    select(isTasksLoadedSelector),
    tap((taksLoaded) => {
      if (!loading && !taksLoaded) {
        store.dispatch(loadAllTasksAction());
        loading = true;
      }
    }),
    filter((tasksLoaded) => tasksLoaded),
    first(),
    finalize(() => (loading = false))
  );
};
