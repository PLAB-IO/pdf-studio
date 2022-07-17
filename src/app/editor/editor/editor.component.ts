import {Component, HostListener, OnInit} from '@angular/core'
import {Element} from '../shared/element-model'
import {Observable} from "rxjs"
import {EditorStore} from "../shared/store/editor.store"

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public elements: Element[] = []
  public zoom$: Observable<number> = this.editorStore.zoom$

  constructor(
    private readonly editorStore: EditorStore,
  ) {}

  ngOnInit(): void {
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

  @HostListener('wheel', ['$event'])
  handleMouseEvent(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault()
      if (event.deltaY < 0) {
        this.editorStore.zoomIn()
      } else {
        this.editorStore.zoomOut()
      }
    }
  }

  zoom(direction: boolean) {
    if (direction) {
      this.editorStore.zoomIn()
    } else {
      this.editorStore.zoomOut()
    }
  }
}
