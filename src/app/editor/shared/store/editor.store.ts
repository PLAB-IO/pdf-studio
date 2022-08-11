import {ComponentStore} from "@ngrx/component-store"
import {EventEmitter, Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Element} from "../model/element.model"

export type DocTemplate = {
  name: string
  updatedAt: string
}

export type EditorState = {
  zoom: number
  elements: Element[]
  selectedElement: Element | undefined
  pagesNbr: number
  template: DocTemplate
}

export type PageEvent = {
  event: 'HOVER_ENTER' | 'HOVER_LEAVE' | 'SELECTED'
  elementId: string
  allPages: boolean
  pageNo: number
  offsetWidth: number
  offsetHeight: number
  x: number
  y: number
}

@Injectable()
export class EditorStore extends ComponentStore<EditorState> {

  constructor() {
    super({
      zoom: 0.75,
      elements: [],
      selectedElement: undefined,
      pagesNbr: 3,
      template: {
        name: 'Certificate NAP',
        updatedAt: '2020-07-10 15:00:00.000',
      }
    })
  }

  readonly zoom$: Observable<number> = this.select(state => state.zoom)
  readonly pagesNbr$: Observable<number> = this.select(state => state.pagesNbr)
  readonly elements$: Observable<Element[]> = this.select(state => state.elements)
  readonly template$: Observable<DocTemplate> = this.select(state => state.template)
  readonly selectedElement$: Observable<Element|undefined> = this.select(state => state.selectedElement)
  readonly pageEvent$: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()

  readonly zoomIn = this.updater((state) => ({
    ...state,
    zoom: state.zoom + 0.25,
  }))

  readonly zoomOut = this.updater((state) => ({
    ...state,
    zoom: state.zoom === 0.25 ? 0.25 : state.zoom - 0.25,
  }))

  readonly putElement = this.updater((state, element: Element) => ({
    ...state,
    elements: [
      ...state.elements.filter((el: Element) => el.id !== element.id),
      ...[element],
    ],
  }))

  readonly patchElement = this.updater((
    state,
    patchObj: {id: string, key: string, value: any}
  ) => {
    const element = state.elements.find(el => el.id === patchObj.id)
    if (!element) {
      throw Error(`element id ${patchObj.id} not found to be patched`)
    }
    const patchElement = {
      ...element,
      [patchObj.key]: patchObj.value
    }

    return {
    ...state,
      elements: [
      ...state.elements.filter((el: Element) => el.id !== patchObj.id),
      ...[patchElement]
    ],
    }
  })

  readonly selectElement = this.updater((state, elementId: string) => {
    return {
      ...state,
      selectedElement: state.elements.find(el => el.id === elementId)
    }
  })

  readonly clearEditableElement = this.updater((state) => {
    return {
      ...state,
      selectedElement: undefined,
      elements: [
        ...state.elements.map((el: Element) => {
          el.editable = false
          return el
        }),
      ],
    }
  })

  getElement(elementId: string): Observable<Element> {
    return this.select((state) => {
      const element = state.elements.find(el => el.id === elementId)
      if (!element) {
        throw Error(`element id ${elementId} not found`)
      }
      return element
    })
  }

  // readonly getElement = this.effect((elementId$: Observable<string>) => {
  //   return elementId$.pipe(
  //     // Handle race condition with the proper choice of the flattening operator.
  //     switchMap((id) => this.moviesService.fetchMovie(id).pipe(
  //       // Act on the result within inner pipe.
  //       tap({
  //         next: (movie) => this.addMovie(movie),
  //         error: (e) => this.logError(e),
  //       }),
  //       // 👇 Handle potential error within inner pipe.
  //       catchError(() => EMPTY),
  //     )),
  //   );
  // });

}
