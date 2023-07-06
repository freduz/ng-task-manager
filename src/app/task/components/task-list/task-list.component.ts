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
  of,
  tap,
} from 'rxjs';
import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { ITask } from '../../types/task.interface';
import { tasksSelector } from '../../store/selector';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks$!: Observable<ITask[]>;
  @ViewChild('taskFilter') taskFilter!: ElementRef<HTMLSelectElement>;
  private _statusChanger$ = new BehaviorSubject('');

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.tasks$ = this._store.pipe(select(tasksSelector));
    combineLatest([this.tasks$, this._statusChanger$]).subscribe(
      ([tasks, status]) => {
        if (status != '') {
          this.tasks$ = of(tasks.filter((task) => task.status === status));
        }
      }
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.taskFilter.nativeElement, 'change')
      .pipe(
        tap((event) => {
          const value = (event?.target as HTMLSelectElement).value;
          this._statusChanger$.next(value);
        })
      )
      .subscribe();
  }
}
