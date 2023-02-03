import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export type SelectOption = {
  label: string
  value: string | number
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {

  @Input() value: string | number | boolean = ''
  @Input() options: SelectOption[] = []
  @Input() class: string = ''

  @Output() onChange: EventEmitter<string | number | boolean> = new EventEmitter<string | number | boolean>()

  constructor() { }

  ngOnInit(): void {
  }

}
