import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, fromEvent, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

import { IAppState } from 'src/app/store/types/app-state.interface';
import {
  deleteTaskAction,
  updateTaskAction,
} from '../../store/actions/task.actions';
import { ITaskResponse } from '../../types/task-response.interface';

@Component({
  selector: 'tm-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() task!: ITaskResponse;
  subscriptions: Subscription[] = [];
  @ViewChild('statusChanger') statusChanger!: ElementRef<HTMLSelectElement>;

  constructor(
    private _store: Store<IAppState>,
    private _confirmBoxEvokeService: ConfirmBoxEvokeService
  ) {}

  ngOnInit(): void {}

  deleteTask() {
    this.subscriptions.push(
      this._confirmBoxEvokeService
        .warning(
          'Are you sure!',
          'Do you want to delete it?',
          'Confirm',
          'Decline'
        )
        .subscribe((resp) => {
          if (resp.success)
            this._store.dispatch(deleteTaskAction({ taskId: this.task.id }));
        })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      fromEvent(this.statusChanger.nativeElement, 'change')
        .pipe(
          tap((event: Event) => {
            const status = (event.target as HTMLSelectElement).value;
            this._store.dispatch(
              updateTaskAction({
                task: { ...this.task, status },
                id: this.task.id,
              })
            );
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subsription) => subsription.unsubscribe());
  }
}
