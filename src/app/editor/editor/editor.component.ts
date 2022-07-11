import {AfterViewInit, Component} from '@angular/core'
import {Element} from "../shared/element-model"
import {dragEvent, hoverEvent} from "../elements/abstract-element.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  public zoom = 0.75
  public pageHeight: string = '841.89pt'
  public pageWidth: string = '595.28pt'
  public elements: Element[] = []
  public hoverFramePosition!: null | {height: string, width: string, transform: string}

  public readonly maxHeight = 841.89
  public readonly maxWidth = 595.28

  private draggedElementEvent: dragEvent | null = null

  constructor() {
    // this.pageHeight = (this.maxHeight * this.zoom) + 'pt'
    // this.pageWidth = (this.maxWidth * this.zoom) + 'pt'

    this.pageHeight = (this.maxHeight) + 'pt'
    this.pageWidth = (this.maxWidth) + 'pt'

    this.elements.push({
      id: 'abc',
      name: 'text',
      x: 100,
      y: 10,
      value: '',
      opts: {
        fontSize: 32,
        bold: true,
      }
    })

    this.elements.push({
      id: 'xwed',
      name: 'text',
      x: 200,
      y: 50,
      value: 'Second Title',
      opts: {}
    })
  }

  ngAfterViewInit(): void {
  }

  onPageMouseMove(e: any) {
    if (!this.draggedElementEvent) {
      return
    }

    let newDx = (e.pageX * 0.75 / this.zoom) - this.draggedElementEvent.startX
    let newDy = (e.pageY * 0.75 / this.zoom) - this.draggedElementEvent.startY

    if (newDx > this.maxWidth) {
      newDx = this.maxWidth
    }
    if (newDy > this.maxHeight) {
      newDy = this.maxHeight
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
