import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { addTaskAction } from '../../store/actions/task.actions';
import { Observable } from 'rxjs';
import { IErrorResponse } from '../../types/error-response.interface';
import { errorResponseSelector } from '../../store/selector';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  errors$!: Observable<IErrorResponse | undefined>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.constructTaskForm();
    this.errors$ = this._store.pipe(select(errorResponseSelector));
  }

  constructTaskForm(): void {
    this.taskForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  saveTask() {
    this._store.dispatch(addTaskAction({ task: this.taskForm.value }));
    this._toasterService.showError('edfsf');
  }
}
