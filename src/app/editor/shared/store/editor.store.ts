import {ComponentStore} from "@ngrx/component-store"
import {Injectable} from "@angular/core"
import {Observable, switchMap} from "rxjs"
import {Element} from "../model/element.model"

export interface EditorState {
  zoom: number,
  elements: Element[],
  pagesNbr: number
}

@Injectable()
export class EditorStore extends ComponentStore<EditorState> {

  constructor() {
    super({
      zoom: 0.75,
      elements: [],
      pagesNbr: 1,
    });
  }

  readonly zoom$: Observable<number> = this.select(state => state.zoom)
  readonly pagesNbr$: Observable<number> = this.select(state => state.pagesNbr)
  readonly elements$: Observable<Element[]> = this.select(state => state.elements);

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

  getElement(elementId: string): Observable<Element|undefined> {
    return this.select((state) => state.elements.find(el => el.id === elementId))
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
