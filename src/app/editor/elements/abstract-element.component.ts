import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core'
import {Element} from "../shared/model/element.model"
import {firstValueFrom, Observable} from "rxjs"
import {EditorStore} from "../shared/store/editor.store"

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

  public zoom$: Observable<number> = this.editorStore.zoom$
  private dragEnabled = false

  protected constructor(
    protected el: ElementRef,
    private readonly editorStore: EditorStore,
  ) {
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
  private async onMouseDown(e: { pageX: number, pageY: number }) {
    const zoom = await firstValueFrom(this.zoom$)

    this.dragEnabled = true
    this.dragEvent.emit({
      nativeElement: this.el,
      element: this.element,
      dragEnabled: true,
      startX: (e.pageX * 0.75 / zoom) - this.element.x,
      startY: (e.pageY * 0.75 / zoom) - this.element.y,
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
