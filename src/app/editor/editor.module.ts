import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorComponent } from './editor/editor.component'
import {DragDropModule} from '@angular/cdk/drag-drop'
import { TextElementComponent } from './elements/text-element/text-element.component'

@NgModule({
  declarations: [
    EditorComponent,
    TextElementComponent,
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
