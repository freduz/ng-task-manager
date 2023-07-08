import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from '../auth/components/register/register.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { taskResolver } from '../core/resolvers/task.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'register',
            component: RegisterComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
          },
        ],
      },
      {
        path: 'task',
        loadChildren: () =>
          import('../task/task.module').then((m) => m.TaskModule),
        resolve: { tasks: taskResolver },
      },
      { path: '', redirectTo: 'task', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
