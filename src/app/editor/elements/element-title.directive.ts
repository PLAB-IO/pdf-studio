import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Element} from "../editor/editor.component";

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

@Directive({
  selector: '[appElementTitle]'
})
export class ElementTitleDirective implements OnInit {

  @Input() element!: Element
  @Output() dragEvent: EventEmitter<dragEvent> = new EventEmitter<dragEvent>()
  @Output() hoverEvent: EventEmitter<hoverEvent> = new EventEmitter<hoverEvent>()

  private dragEnabled = false
  private readonly defaultFontSize = 16

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.position = 'absolute'
    this.el.nativeElement.style.display = 'inline-block'
    this.el.nativeElement.style.padding = '1px'
    this.el.nativeElement.style.cursor = 'pointer'
    this.el.nativeElement.style['pointer-events'] = 'auto'
    this.el.nativeElement.style['touch-action'] = 'pan-x pan-y pinch-zoom'

    this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  ngOnInit(): void {
    this.el.nativeElement.innerText = this.element.value || 'Default text'
    this.el.nativeElement.style.transform = 'translate(' + this.element.x + 'pt, ' + this.element.y + 'pt)'
    this.el.nativeElement.style.fontSize = (this.element.opts?.font?.size || this.defaultFontSize) + 'pt'
    this.el.nativeElement.style.lineHeight = (this.element.opts?.font?.size || this.defaultFontSize) + 'pt'

    if (this.element.opts?.font?.bold) {
      this.el.nativeElement.style.fontWeight = 'bold';
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    // console.log(this.el.nativeElement.offsetHeight, this.el.nativeElement.offsetWidth)
    // Create div with height / width of the element in position absolute with zIndex behind element
    // Position the translate element at the same position of the actual element

    this.hoverEvent.emit({
      element: this.element,
      elementRef: this.el,
      hover: true,
    })

    // this.el.nativeElement.style.border = `2px solid ${environment.primaryColor}`
    // this.el.nativeElement.style.padding = ''
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hoverEvent.emit({
      element: this.element,
      elementRef: this.el,
      hover: false,
    })
    // this.el.nativeElement.style.border = ''
    // this.el.nativeElement.style.padding = '1px'
  }

  // Start the drag position
  onMouseDown(e: any) {
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
