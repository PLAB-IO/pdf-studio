import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorComponent } from './editor/editor.component'
import {DragDropModule} from "@angular/cdk/drag-drop"
import { ElementTitleDirective } from './elements/element-title.directive'

@NgModule({
  declarations: [
    EditorComponent,
    ElementTitleDirective
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  exports: [
    EditorComponent,
  ]
})
export class EditorModule { }
