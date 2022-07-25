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

@Component({ template: '' })
export abstract class AbstractElementComponent implements OnInit {
  @Input() elementId!: string
  @Output() dragEvent: EventEmitter<dragEvent> = new EventEmitter<dragEvent>()

  public zoom$: Observable<number> = this.editorStore.zoom$
  public element$!: Observable<Element>
  public element!: Element
  private dragEnabled = false

  protected constructor(
    protected el: ElementRef,
    protected readonly editorStore: EditorStore,
  ) {
    this.el.nativeElement.style.position = 'absolute'
    this.el.nativeElement.style.display = 'inline-block'
    this.el.nativeElement.style.padding = '1px'
    this.el.nativeElement.style.cursor = 'pointer'
    this.el.nativeElement.style['pointer-events'] = 'auto'
    this.el.nativeElement.style['touch-action'] = 'pan-x pan-y pinch-zoom'

    this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.el.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  ngOnInit(): void {
    this.element$ = this.editorStore.getElement(this.elementId)
    this.element$.subscribe(element => {
      if (element) {
        this.element = element
        this.el.nativeElement.style.transform = 'translate(' + this.element.x + 'pt, ' + this.element.y + 'pt)'
      }
    })
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.editorStore.pageEvent$.emit({
      event: 'HOVER_ENTER',
      elementId: this.elementId,
      pageNo: this.element.pageNo,
      offsetWidth: this.el.nativeElement.offsetWidth,
      offsetHeight: this.el.nativeElement.offsetHeight,
      x: this.element.x,
      y: this.element.y,
    })
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.editorStore.pageEvent$.emit({
      event: 'HOVER_LEAVE',
      elementId: this.elementId,
      pageNo: this.element.pageNo,
      offsetWidth: this.el.nativeElement.offsetWidth,
      offsetHeight: this.el.nativeElement.offsetHeight,
      x: this.element.x,
      y: this.element.y,
    })
  }

  // Start the drag position
  private async onMouseDown(e: { pageX: number, pageY: number, stopPropagation: Function }) {
    const zoom = await firstValueFrom(this.zoom$)

    if (this.element.editable) {
      e.stopPropagation()
      return
    }

    this.dragEnabled = true
    this.dragEvent.emit({
      nativeElement: this.el,
      element: this.element,
      dragEnabled: true,
      startX: (e.pageX * 0.75 / zoom) - this.element.x,
      startY: (e.pageY * 0.75 / zoom) - this.element.y,
    })
  }

  private async onMouseUp(e: {stopPropagation: Function }) {
    e.stopPropagation()

    if (!this.element.editable) {
      this.editorStore.patchElement({
        id: this.elementId,
        key: 'editable',
        value: true,
      })
    }

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
