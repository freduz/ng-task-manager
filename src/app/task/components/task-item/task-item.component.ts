import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ITask } from '../../types/task.interface';
import { fromEvent, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/shared/module/top-bar/types/app-state.interface';
import { updateTaskAction } from '../../store/actions/task.actions';
import { ITaskResponse } from '../../types/task-response.interface';

@Component({
  selector: 'tm-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit, AfterViewInit {
  @Input() task!: ITaskResponse;
  @ViewChild('statusChanger') statusChanger!: ElementRef<HTMLSelectElement>;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
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
      .subscribe();
  }
}
