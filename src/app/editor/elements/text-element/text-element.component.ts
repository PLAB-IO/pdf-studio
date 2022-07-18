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
  @Input() options!: TextOptions
  public editable = false
  private readonly defaultFontSize = 12

  constructor(el: ElementRef, editorStore: EditorStore) {
    super(el, editorStore)
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.fontSize = (this.options?.fontSize || this.defaultFontSize) + 'pt'
    this.el.nativeElement.style.lineHeight = (this.options?.fontSize || this.defaultFontSize) + 'pt'
    if (this.options?.bold) {
      this.el.nativeElement.style.fontWeight = 'bold';
    }
    if (this.options?.fontFamily) {
      this.el.nativeElement.style.fontFamily = this.options.fontFamily;
    }
    if (this.options?.color) {
      this.el.nativeElement.style.color = this.options.color;
    }
    if (this.options?.opacity) {
      this.el.nativeElement.style.opacity = this.options.opacity;
    }
  }
}
