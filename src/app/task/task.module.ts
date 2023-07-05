import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    AddTaskComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHomeComponent,
  ],
  imports: [CommonModule, TaskRoutingModule],
})
export class TaskModule {}
