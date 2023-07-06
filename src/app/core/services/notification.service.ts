import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _toaster: ToastrService) {}

  showSuccess(message: string): void {
    this._toaster.success(message);
  }

  showError(message: string): void {
    Object.values(message).forEach((error) => {
      this._toaster.error(error);
    });
  }
}
