import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  fromEvent,
  map,
  of,
  tap,
} from 'rxjs';
import { IAppState } from 'src/app/store/types/app-state.interface';
import { tasksSelector } from '../../store/selector';
import { ITaskResponse } from '../../types/task-response.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks$!: Observable<ITaskResponse[]>;
  @ViewChild('taskFilter') taskFilter!: ElementRef<HTMLSelectElement>;
  @ViewChild('taskSort') taskSort!: ElementRef<HTMLSelectElement>;

  private _filterTask$ = new BehaviorSubject('');
  private _sortTask$ = new BehaviorSubject('');

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.tasks$ = this._store.pipe(select(tasksSelector));
    combineLatest([this.tasks$, this._filterTask$, this._sortTask$])
      .pipe(
        map(([tasks, status, sortOption]) => {
          if (status != 'ALL' && status != '') {
            tasks = tasks.filter((task) => task.status === status);
          }
          const sortOrder = sortOption.slice(-3);
          const sortKey = sortOption.slice(0, -3);

          if (sortKey === 'title') {
            tasks = tasks.slice().sort((a, b) => {
              if (sortOrder === 'Asc') {
                return a.title.localeCompare(b.title);
              } else {
                return b.title.localeCompare(a.title);
              }
            });
          } else if (sortKey === 'dueDate') {
            tasks = tasks.slice().sort((a, b) => {
              const dateA = new Date(a.dueDate).getTime();
              const dateB = new Date(b.dueDate).getTime();
              if (sortOrder === 'Asc') {
                return dateA - dateB;
              } else {
                return dateB - dateA;
              }
            });
          }

          return tasks;
        })
      )
      .subscribe((sortedTasks) => (this.tasks$ = of(sortedTasks)));
  }

  ngAfterViewInit(): void {
    fromEvent(this.taskFilter.nativeElement, 'change')
      .pipe(
        tap((event) => {
          const filterValue = (event?.target as HTMLSelectElement).value;
          this._filterTask$.next(filterValue);
        })
      )
      .subscribe();

    fromEvent(this.taskSort.nativeElement, 'change')
      .pipe(
        tap((event: Event) => {
          const sortValue = (event.target as HTMLSelectElement).value;
          this._sortTask$.next(sortValue);
        })
      )
      .subscribe();
  }
}
