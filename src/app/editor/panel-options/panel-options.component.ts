import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {EditorStore} from "../shared/store/editor.store"
import {Observable} from "rxjs"
import {Element} from "../shared/model/element.model"

@Component({
  selector: 'app-panel-options',
  templateUrl: './panel-options.component.html',
  styleUrls: ['./panel-options.component.scss']
})
export class PanelOptionsComponent implements OnInit {

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()
  public selectedElement$: Observable<Element | undefined> = this.editorStore.selectedElement$
  public selectedElement: Element | undefined

  constructor(
    private readonly editorStore: EditorStore,
  ) {}

  ngOnInit(): void {
    this.selectedElement$.subscribe(element => this.selectedElement = element)
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

}
