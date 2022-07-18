import {TextOptions} from "../elements/text-element/text-element.component";

export enum ElementType {
  'text' = 'text',
  'image' = 'image',
}

export type Element = {
  id: string
  type: ElementType
  x: number
  y: number
  value: string
  opts: TextOptions
  pageNo: number
  editable: boolean
}

// A0 (2383.94 x 3370.39)
// A1 (1683.78 x 2383.94)
// A2 (1190.55 x 1683.78)
// A3 (841.89 x 1190.55)
// A4 (595.28 x 841.89)
// A5 (419.53 x 595.28)
// A6 (297.64 x 419.53)
// A7 (209.76 x 297.64)
// A8 (147.40 x 209.76)
// A9 (104.88 x 147.40)
// A10 (73.70 x 104.88)
export type Page = {
  format: 'A4'
  orientation: 'LANDSCAPE' | 'PORTRAIT'
}
