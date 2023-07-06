import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';

import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { addTaskAction } from '../../store/actions/task.actions';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IErrorResponse } from '../../types/error-response.interface';
import { isSavingSelector } from '../../store/selector';
import { IDeactivateComponent } from 'src/app/core/guards/deactivate.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, IDeactivateComponent {
  taskForm!: FormGroup;
  isSubmiting$!: Observable<boolean>;
  private _unsubscribe$: Observable<any> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _spinner: NgxSpinnerService
  ) {}

  canExit(): Observable<boolean> | Promise<boolean> | boolean {
    const prompt = !this.taskForm.pristine
      ? confirm('Do you wish to Please confirm')
      : true;
    if (prompt) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.constructTaskForm();
    this._store
      .pipe(select(isSavingSelector), takeUntil(this._unsubscribe$))
      .subscribe((saving) => {
        if (saving) {
          this._spinner.show();
        } else {
          this._spinner.hide();
          this.taskForm.reset();
        }
      });
  }

  constructTaskForm(): void {
    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(9)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      dueDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  get title(): FormControl {
    return this.taskForm.get('title') as FormControl;
  }
  get description(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }
  get dueDate(): FormControl {
    return this.taskForm.get('dueDate') as FormControl;
  }
  get status(): FormControl {
    return this.taskForm.get('status') as FormControl;
  }

  saveTask() {
    this._store.dispatch(addTaskAction({ task: this.taskForm.value }));
  }
}
