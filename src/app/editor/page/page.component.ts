import {Component, Input, OnInit} from '@angular/core'
import {Element} from "../shared/element-model"
import {dragEvent, hoverEvent} from "../elements/abstract-element.component"
import {firstValueFrom, Observable} from "rxjs"
import {EditorStore} from "../shared/store/editor.store"

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() elements: Element[] = []

  public zoom$: Observable<number> = this.editorStore.zoom$
  public pageHeight: string = '841.89pt'
  public pageWidth: string = '595.28pt'
  public hoverFramePosition!: null | {height: string, width: string, transform: string}

  public readonly maxHeight = 841.89
  public readonly maxWidth = 595.28

  private draggedElementEvent: dragEvent | null = null
  private hoverElement!: Element | null
  private selectedElement!: Element | null

  constructor(
    private readonly editorStore: EditorStore,
  ) {
    this.pageHeight = (this.maxHeight) + 'pt'
    this.pageWidth = (this.maxWidth) + 'pt'
  }

  ngOnInit(): void {
  }

  async onPageMouseMove(e: any) {
    if (!this.draggedElementEvent) {
      return
    }
    const zoom = await firstValueFrom(this.zoom$)
    let newDx = (e.pageX * 0.75 / zoom) - this.draggedElementEvent.startX
    let newDy = (e.pageY * 0.75 / zoom) - this.draggedElementEvent.startY

    if (newDx > this.maxWidth) {
      newDx = this.maxWidth
    }
    if (newDy > this.maxHeight) {
      newDy = this.maxHeight
    }

    this.draggedElementEvent.nativeElement.nativeElement.style.transform = `translate(${newDx}pt, ${newDy}pt)`
    this.draggedElementEvent.element.x = newDx
    this.draggedElementEvent.element.y = newDy

    this.hoverFramePosition = await this.computeFrameBoxPosition(
      this.draggedElementEvent.nativeElement.nativeElement.offsetWidth,
      this.draggedElementEvent.nativeElement.nativeElement.offsetHeight,
      this.draggedElementEvent.element,
    )
  }

  onPageClick(e: any) {
    if (this.hoverFramePosition) {
      this.selectedElement = this.hoverElement
      return
    }
    this.selectedElement = null
  }

  onDragEvent(e: dragEvent) {
    if (!e.dragEnabled) {
      this.draggedElementEvent = null
      return
    }
    this.draggedElementEvent = e
  }

  async onHoverElement(e: hoverEvent) {
    if (!e.hover) {
      this.hoverFramePosition = null
      this.hoverElement = null
      return
    }
    this.hoverElement = e.element
    this.hoverFramePosition = await this.computeFrameBoxPosition(
      e.elementRef.nativeElement.offsetWidth,
      e.elementRef.nativeElement.offsetHeight,
      e.element
    )
  }

  private async computeFrameBoxPosition(offsetWidth: number, offsetHeight: number, element: Element) {
    const zoom = await firstValueFrom(this.zoom$)
    return {
      width: Math.round((offsetWidth + 4) * zoom) + 'px',
      height: Math.round((offsetHeight + 2) * zoom) + 'px',
      transform: `translate(${element.x * zoom}pt, ${element.y * zoom}pt)`,
    }
  }

}
