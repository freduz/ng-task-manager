import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';

import { IAppState } from '../../../store/types/app-state.interface';
import {
  addTaskAction,
  updateTaskAction,
} from '../../store/actions/task.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  getTaskByIdSelector,
  isSavingSelector,
  isUpdating,
} from '../../store/selector';
import { IDeactivateComponent } from 'src/app/core/guards/deactivate.component';
import { ITaskResponse } from '../../types/task-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent
  implements OnInit, IDeactivateComponent, OnDestroy
{
  taskForm!: FormGroup;
  isSubmiting$!: Observable<boolean>;
  task!: ITaskResponse;
  private _unsubscribe$: Subject<void> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _spinner: NgxSpinnerService,
    private _router: Router
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
    this._store.pipe(select(getTaskByIdSelector)).subscribe((task) => {
      this.task = task as ITaskResponse;
    });
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

    this.constructTaskForm();
  }

  constructTaskForm(): void {
    const formattedDueDate = this.formatDate(
      new Date(this.task?.dueDate ? this.task?.dueDate : new Date())
    );
    this.taskForm = this._fb.group({
      title: [
        this.task?.title != '' ? this.task?.title : '',
        [Validators.required, Validators.minLength(9)],
      ],
      description: [
        this.task?.description != '' ? this.task?.description : '',
        [Validators.required, Validators.minLength(15)],
      ],
      dueDate: [formattedDueDate, [Validators.required]],
      status: [
        this.task?.status != '' ? this.task?.status : '',
        [Validators.required],
      ],
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

  updateTask() {
    this._store.dispatch(
      updateTaskAction({
        task: { ...this.taskForm.value, id: this.task.id },
        id: this.task.id,
      })
    );
    this._store
      .pipe(select(isUpdating), takeUntil(this._unsubscribe$))
      .subscribe((isUpdating) => {
        if (isUpdating) {
          this._spinner.show();
        } else {
          this._spinner.hide();
          this._router.navigateByUrl('task');
        }
      });
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  ngOnDestroy(): void {
    this._unsubscribe$;
    this._unsubscribe$.complete();
  }
}
