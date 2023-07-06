import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { ITask } from '../../types/task.interface';
import { tasksSelector } from '../../store/selector';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<ITask[]>;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.tasks$ = this._store.pipe(select(tasksSelector));
  }
}
