import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { TaskRoutingModule } from './task-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, taskFeatureKey } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';
import { FormControlsModule } from '../shared/module/form-controls/form-controls.module';

@NgModule({
  declarations: [
    AddTaskComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHomeComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    FormControlsModule,
    StoreModule.forFeature(taskFeatureKey, reducers),
    EffectsModule.forFeature([TaskEffects]),
  ],
})
export class TaskModule {}
