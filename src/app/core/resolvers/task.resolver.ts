import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, first, tap } from 'rxjs';
import { loadAllTasksAction } from 'src/app/task/store/actions/task.actions';
import { isTasksLoadedSelector } from 'src/app/task/store/selector';

export const taskResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);
  const spinnerService = inject(NgxSpinnerService);
  let loading = false;
  return store.pipe(
    select(isTasksLoadedSelector),
    tap((taksLoaded) => {
      if (!loading && !taksLoaded) {
        spinnerService.show();
        store.dispatch(loadAllTasksAction());
        loading = true;
      } else {
        spinnerService.hide();
      }
    }),
    filter((tasksLoaded) => tasksLoaded),
    first(),
    finalize(() => (loading = false))
  );
};
