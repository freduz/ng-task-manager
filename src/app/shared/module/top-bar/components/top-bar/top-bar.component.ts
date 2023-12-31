import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/auth/store/actions/logout.actions';

import { currentUsername, isLoggedIn } from 'src/app/auth/store/selector';
import { IAppState } from 'src/app/store/types/app-state.interface';

@Component({
  selector: 'tm-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  username$!: Observable<string | undefined>;
  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._store.pipe(select(isLoggedIn));
    this.username$ = this._store.pipe(select(currentUsername));
  }

  logout(): void {
    this._store.dispatch(logoutAction());
  }
}
