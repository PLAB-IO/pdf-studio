import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {dragEvent, hoverEvent} from "../elements/element-title.directive";
import {style} from "@angular/animations";

export type Element = {
  name: string
  id: string
  x: number
  y: number
  value?: string
  opts?: {
    font?: {
      size: number
      bold: boolean
    }
  }
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  public pageHeight: string = '841.89pt'
  public pageWidth: string = '595.28pt'
  public elements: Element[] = []

  public hoverFramePosition!: null | {height: string, width: string, transform: string}

  private zoom = 1
  private readonly maxHeight = 841.89
  private readonly maxWidth = 595.28

  private draggedElementEvent: dragEvent | null = null

  constructor() {
    this.pageHeight = (this.maxHeight * this.zoom) + 'pt'
    this.pageWidth = (this.maxWidth * this.zoom) + 'pt'

    this.elements.push({
      id: 'abc',
      name: 'title',
      x: 100,
      y: 10,
      opts: {
        font: {
          size: 32,
          bold: true,
        }
      }
    })

    this.elements.push({
      id: 'xwed',
      name: 'title',
      x: 200,
      y: 50,
      value: 'Second Title'
    })
  }

  ngAfterViewInit(): void {
  }

  onPageMouseMove(e: any) {
    if (!this.draggedElementEvent) {
      return
    }

    let newDx = e.pageX * 0.75 - this.draggedElementEvent.startX
    let newDy = e.pageY * 0.75 - this.draggedElementEvent.startY
    if (newDx > this.maxWidth * this.zoom) {
      newDx = this.maxWidth * this.zoom
    }
    if (newDy > this.maxHeight * this.zoom) {
      newDy = this.maxHeight  * this.zoom
    }

    this.draggedElementEvent.nativeElement.nativeElement.style.transform = `translate(${newDx}pt, ${newDy}pt)`
    this.draggedElementEvent.element.x = newDx
    this.draggedElementEvent.element.y = newDy

    this.hoverFramePosition = {
      width: this.draggedElementEvent.nativeElement.nativeElement.offsetWidth + 'px',
      height: this.draggedElementEvent.nativeElement.nativeElement.offsetHeight + 'px',
      transform: `translate(${newDx}pt, ${newDy}pt)`,
    }
  }

  onDragEvent(e: dragEvent) {
    if (!e.dragEnabled) {
      this.draggedElementEvent = null
      return
    }
    this.draggedElementEvent = e
  }

  onHoverElement(e: hoverEvent) {
    if (!e.hover) {
      this.hoverFramePosition = null
      return
    }
    this.hoverFramePosition = {
      width: e.elementRef.nativeElement.offsetWidth + 'px',
      height: e.elementRef.nativeElement.offsetHeight + 'px',
      transform: e.elementRef.nativeElement.style.transform,
    }
  }

  info() {
    console.log(this.elements)
  }
}
