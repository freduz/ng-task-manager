import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from '../auth/components/register/register.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { taskResolver } from '../core/resolvers/task.resolver';
import { authGuardGuard } from '../core/guards/auth-guard.guard';
import { protectResourceGuard } from '../core/guards/protect-resource.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'auth',
        canActivate: [authGuardGuard],
        children: [
          {
            path: 'register',
            component: RegisterComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login',
          },
        ],
      },
      {
        path: 'task',
        canActivate: [protectResourceGuard],
        loadChildren: () =>
          import('../task/task.module').then((m) => m.TaskModule),
        resolve: { tasks: taskResolver },
      },
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
