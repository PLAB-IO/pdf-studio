import {TextOptions} from "../../elements/text-element/text-element.component"

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
  allPages: boolean
  pageNo: number
  editable: boolean
}
