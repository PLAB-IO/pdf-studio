import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorComponent } from './editor/editor.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { TextElementComponent } from './elements/text-element/text-element.component'
import { PageComponent } from './page/page.component'
import { PanelOptionsComponent } from './panel-options/panel-options.component'
import { StoreModule } from "@ngrx/store"
import { zoomReducer } from "./shared/store/editor.reducer";

@NgModule({
  declarations: [
    EditorComponent,
    TextElementComponent,
    PageComponent,
    PanelOptionsComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    StoreModule.forRoot({editor: zoomReducer}, {})
  ],
  exports: [
    EditorComponent,
  ]
})
export class EditorModule { }
