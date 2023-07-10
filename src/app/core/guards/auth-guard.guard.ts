import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PersistanceService } from '../services/persistence.service';

export const authGuardGuard: CanActivateFn = () => {
  const persistence = inject(PersistanceService);
  const token = persistence.get('accessToken');
  return token ? false : true;
};
