import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { deactivateGuard } from '../core/guards/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
    children: [
      {
        path: '',
        component: TaskListComponent,
      },
      {
        path: 'add',
        component: AddTaskComponent,
        canDeactivate: [deactivateGuard],
      },
      {
        path: ':id',
        component: AddTaskComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
