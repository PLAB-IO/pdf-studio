import { createAction } from '@ngrx/store'

export const zoomIn = createAction('[Editor::Zoom] Increment')
export const zoomOut = createAction('[Editor::Zoom] Decrement')
