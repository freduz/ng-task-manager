import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  ngOnInit(): void {}
}
