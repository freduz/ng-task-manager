import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _injector: Injector) {}
  handleError(error: Error | HttpErrorResponse): void {
    let message: string = '';
    const errorService = this._injector.get(ErrorService);
    const notifier = this._injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerMessage(error);
      notifier.showError(message);
    }
  }
}
