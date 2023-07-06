import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, TextAreaComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, TextAreaComponent],
})
export class FormControlsModule {}
