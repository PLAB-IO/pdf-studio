import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {

  @Input() type: 'text' | 'number' = 'text'
  @Input() value: string | number = ''
  @Input() class: string = ''

  @Output() onChange: EventEmitter<string|number> = new EventEmitter<string | number>()

  constructor() { }

  ngOnInit(): void {
  }

}
