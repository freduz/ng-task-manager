import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/types/app-state.interface';
import { currentUserAction } from './auth/store/actions/login.actions';
import { PersistanceService } from './core/services/persistence.service';
import { Observable } from 'rxjs';
import { isLoading, isLoggedIn } from './auth/store/selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  constructor(
    private _store: Store<IAppState>,
    private _persistenceService: PersistanceService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.pipe(select(isLoading));
    if (this._persistenceService.get('accessToken')) {
      this._store.dispatch(currentUserAction());
    }
  }
}
