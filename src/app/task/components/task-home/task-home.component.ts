import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent {}
