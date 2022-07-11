import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core'
import {Element} from "../shared/element-model";

export type dragEvent = {
  nativeElement: ElementRef
  element: Element
  dragEnabled: boolean
  startX: number
  startY: number
}

export type hoverEvent = {
  element: Element
  elementRef: ElementRef
  hover: boolean
}

@Component({ template: '' })
export abstract class AbstractElementComponent implements OnInit{
  @Input() element!: Element
  @Output() dragEvent: EventEmitter<dragEvent> = new EventEmitter<dragEvent>()
  @Output() hoverEvent: EventEmitter<hoverEvent> = new EventEmitter<hoverEvent>()

  private dragEnabled = false

  constructor(protected el: ElementRef) {
    this.el.nativeElement.style.position = 'absolute'
    this.el.nativeElement.style.display = 'inline-block'
    this.el.nativeElement.style.padding = '1px'
    this.el.nativeElement.style.cursor = 'pointer'
    this.el.nativeElement.style['pointer-events'] = 'auto'
    this.el.nativeElement.style['touch-action'] = 'pan-x pan-y pinch-zoom'

    this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  ngOnInit(): void {
    this.el.nativeElement.style.transform = 'translate(' + this.element.x + 'pt, ' + this.element.y + 'pt)'
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hoverEvent.emit({
      element: this.element,
      elementRef: this.el,
      hover: true,
    })
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hoverEvent.emit({
      element: this.element,
      elementRef: this.el,
      hover: false,
    })
  }

  // Start the drag position
  private onMouseDown(e: { pageX: number, pageY: number }) {
    this.dragEnabled = true
    this.dragEvent.emit({
      nativeElement: this.el,
      element: this.element,
      dragEnabled: true,
      startX: e.pageX * 0.75 - this.element.x,
      startY: e.pageY * 0.75 - this.element.y,
    })
  }

  @HostListener('mouseup') onMouseUp() {
    this.dragEnabled = false
    this.dragEvent.emit({
      element: this.element,
      nativeElement: this.el,
      dragEnabled: false,
      startX: 0,
      startY: 0,
    })
  }
}
