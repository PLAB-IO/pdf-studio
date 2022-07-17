import { createReducer, on } from '@ngrx/store'
import { zoomIn, zoomOut } from './editor.action'

export const initialState = 0.75;

export const zoomReducer = createReducer(
  initialState,
  on(zoomIn, (state) => state + 0.25),
  on(zoomOut, (state) => state === 0.25 ? 0.25 : state - 0.25),
)
