import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent implements OnInit {

  public visible = false
  @Input() value: string = '#000000'
  @Input() favColors: string[] = ['#000000', '#ffffff', '#3e78e8', '#50d71e', '#dc2626']

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>()

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {}

  selectColor(color: string) {
    console.log(color)
    this.onChange.emit(color)
    this.value = color
  }

  toggle() {
    this.visible = !this.visible
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.visible = false
    }
  }

}
