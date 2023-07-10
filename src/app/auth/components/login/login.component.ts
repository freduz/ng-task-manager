import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ILoginRequest } from '../../types/login-request.interface';
import { loginAction } from '../../store/actions/login.actions';
import { IAppState } from 'src/app/store/types/app-state.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { isLoggedIn, isSubmitting } from '../../store/selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLogging$!: Observable<boolean>;
  private _unsubscribe$: Subject<void> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.generateLoginForm();
    this._store
      .pipe(select(isSubmitting))
      .subscribe((isSubmitting: boolean) => {
        if (!isSubmitting) {
          this._spinner.hide();
        }
      });
  }

  generateLoginForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  doLogin(): void {
    const loginRequest: ILoginRequest = this.loginForm.value;
    this._spinner.show();
    this._store.dispatch(loginAction({ loginRequest }));
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
