import {ComponentStore} from "@ngrx/component-store"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Element} from "../element-model"

export interface EditorState {
  zoom: number,
  elements: Element[],
}

@Injectable()
export class EditorStore extends ComponentStore<EditorState> {

  constructor() {
    super({zoom: 0.75, elements: []});
  }

  readonly zoom$: Observable<number> = this.select(state => state.zoom);

  readonly zoomIn = this.updater((state) => ({
    ...state,
    zoom: state.zoom + 0.25,
  }))

  readonly zoomOut = this.updater((state) => ({
    ...state,
    zoom: state.zoom === 0.25 ? 0.25 : state.zoom - 0.25,
  }))

}
