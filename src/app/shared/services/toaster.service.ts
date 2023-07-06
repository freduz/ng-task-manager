import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private _toaster: ToastrService) {}

  showSucces(message: string) {
    this._toaster.success(message);
  }
  showError(message: string) {
    this._toaster.error('Hello its error');
  }
}
