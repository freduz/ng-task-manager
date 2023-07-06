import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../types/task.interface';

@Component({
  selector: 'tm-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: ITask;

  constructor() {}

  ngOnInit(): void {}
}
