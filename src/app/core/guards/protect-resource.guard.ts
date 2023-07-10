import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { isLoggedIn } from 'src/app/auth/store/selector';

export const protectResourceGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.pipe(
    select(isLoggedIn),
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['auth', 'login']);
        return false;
      }
    })
  );
};
