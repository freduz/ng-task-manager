import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './store/types/app-state.interface';
import { currentUserAction } from './auth/store/actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this._store.dispatch(currentUserAction());
  }
}
