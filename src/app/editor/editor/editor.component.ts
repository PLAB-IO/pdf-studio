import {Component, HostListener, OnInit} from '@angular/core'
import {ElementType} from '../shared/model/element.model'
import {Observable} from "rxjs"
import {EditorStore} from "../shared/store/editor.store"

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public zoom$: Observable<number> = this.editorStore.zoom$
  public pageNbr$: Observable<number> = this.editorStore.pagesNbr$

  constructor(
    private readonly editorStore: EditorStore,
  ) {}

  ngOnInit(): void {
    this.editorStore.putElement({
      id: '001',
      type: ElementType.text,
      x: 100,
      y: 10,
      value: '',
      opts: {
        fontSize: 32,
        bold: true,
      },
      editable: false,
      pageNo: 1,
    })

    this.editorStore.putElement({
      id: '002',
      type: ElementType.text,
      x: 200,
      y: 50,
      value: 'Second Title',
      opts: {},
      editable: false,
      pageNo: 1,
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
