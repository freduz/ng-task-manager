import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _injector: Injector, private _router: Router) {}
  handleError(error: Error | HttpErrorResponse): void {
    let message: string = '';
    const errorService = this._injector.get(ErrorService);
    const notifier = this._injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerMessage(error);
      switch (error.status) {
        case 404:
          const [, errorMsg] = Object.values(message);
          notifier.showError(errorMsg);
          break;
        case 401:
          notifier.showError(error?.error?.message ?? 'Logged out');
          this._router.navigateByUrl('/');
          break;
        case 400:
          notifier.showError(error?.error?.message ?? 'Bad client request');
          break;
        default:
      }
    }
  }
}
