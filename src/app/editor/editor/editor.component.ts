import {Component, HostListener, OnInit} from '@angular/core'
import {Element, ElementType} from '../shared/model/element.model'
import {Observable} from "rxjs"
import {DocTemplate, EditorStore} from "../shared/store/editor.store"

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public zoom$: Observable<number> = this.editorStore.zoom$
  public pageNbr$: Observable<number> = this.editorStore.pagesNbr$
  public pagesNo: number[] = []
  public template!: DocTemplate
  public selectedElement$: Observable<Element | undefined> = this.editorStore.selectedElement$
  public optPanelOpened = false

  constructor(
    private readonly editorStore: EditorStore,
  ) {}

  ngOnInit(): void {
    this.editorStore.template$.subscribe(tpl => this.template = tpl)
    this.selectedElement$.subscribe(element => {
      if (element) {
        this.optPanelOpened = true
      }
    })
    this.pageNbr$.subscribe((pageNbr: number) => {
      const pagesNo = []
      for (let p = 1; p <= pageNbr; p++) {
        pagesNo.push(p)
      }
      this.pagesNo = pagesNo
    })
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
      allPages: false,
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
      allPages: false,
      editable: false,
      pageNo: 2,
    })

    this.editorStore.putElement({
      id: '003',
      type: ElementType.text,
      x: 20,
      y: 400,
      value: 'Youi',
      opts: {},
      allPages: false,
      editable: false,
      pageNo: 3,
    })


    this.editorStore.putElement({
      id: '004',
      type: ElementType.text,
      x: 150,
      y: 50,
      value: 'Layla',
      opts: {},
      allPages: true,
      editable: false,
      pageNo: 3,
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
