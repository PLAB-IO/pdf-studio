import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core'
import {AbstractElementComponent} from "../abstract-element.component"
import {EditorStore} from "../../shared/store/editor.store"

export type TextOptions = {
  fontFamily?: string
  fontSize?: number
  bold?: boolean
  color?: string
  opacity?: number
}

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.scss']
})
export class TextElementComponent extends AbstractElementComponent implements OnInit, AfterViewInit {
  private readonly defaultFontSize = 12

  constructor(el: ElementRef, editorStore: EditorStore) {
    super(el, editorStore)
  }

  ngAfterViewInit(): void {
    this.element$.subscribe(element => {
      const options = element?.opts || {}

      this.el.nativeElement.style.fontSize = (options?.fontSize || this.defaultFontSize) + 'pt'
      this.el.nativeElement.style.lineHeight = (options?.fontSize || this.defaultFontSize) + 'pt'
      if (options?.bold) {
        this.el.nativeElement.style.fontWeight = 'bold'
      }
      if (options?.fontFamily) {
        this.el.nativeElement.style.fontFamily = options.fontFamily
      }
      if (options?.color) {
        this.el.nativeElement.style.color = options.color
      }
      if (options?.opacity) {
        this.el.nativeElement.style.opacity = options.opacity
      }
    })
  }

  onInput(event: Event) {
    //console.log('onInput', event)
  }

  onBlur(event: any) {
    this.editorStore.patchElement({
      id: this.elementId,
      key: 'value',
      value: event.target.innerText,
    })
  }
}
