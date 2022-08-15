import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {EditorStore} from "../shared/store/editor.store"
import {Observable, of} from "rxjs"
import {Element} from "../shared/model/element.model"

@Component({
  selector: 'app-panel-options',
  templateUrl: './panel-options.component.html',
  styleUrls: ['./panel-options.component.scss']
})
export class PanelOptionsComponent implements OnInit {

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()
  public selectedElement: Element | undefined
  public selectedElement$: Observable<Element | undefined> = of(undefined)

  constructor(
    private readonly editorStore: EditorStore,
  ) {}

  ngOnInit(): void {
    this.editorStore.selectedElementId$.subscribe(elementId => {
      if (!elementId) {
        this.selectedElement$ = of(undefined)
        return
      }
      this.selectedElement$ = this.editorStore.getElement(elementId)
      this.selectedElement$.subscribe(element => this.selectedElement = element)
    })
  }

  close() {
    this.onClose.emit(true)
  }

  onChangeCheckbox(event: any, controlName: string) {
    if (!this.selectedElement) {
      return
    }
    if (controlName === 'allPages') {
      this.editorStore.patchElement({
        id: this.selectedElement.id,
        key: 'allPages',
        value: event.target.checked,
      })
    }
  }

  patchOpts(opt: string, value: string | number) {
    if (!this.selectedElement) {
      return
    }
    const opts = {
      ...this.selectedElement.opts,
      [opt]: value,
    }
    this.editorStore.patchElement({
      id: this.selectedElement.id,
      key: 'opts',
      value: opts,
    })
  }

}
