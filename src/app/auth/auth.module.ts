import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, reducer } from './store/reducer';
import { FormControlsModule } from '../shared/module/form-controls/form-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effects/login.effects';
import { LogoutEffects } from './store/effects/logut.effects';
import { RegisterEffects } from './store/effects/register.effects';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(authFeatureKey, reducer),
    EffectsModule.forFeature([LoginEffects, LogoutEffects, RegisterEffects]),
    FormControlsModule,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
