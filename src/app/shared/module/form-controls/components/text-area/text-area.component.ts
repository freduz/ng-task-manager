import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tm-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() placeholder: string = '';
}
