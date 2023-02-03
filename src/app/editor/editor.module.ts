import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorComponent } from './editor/editor.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { TextElementComponent } from './elements/text-element/text-element.component'
import { PageComponent } from './page/page.component'
import { PanelOptionsComponent } from './panel-options/panel-options.component'
import { EditorStore } from "./shared/store/editor.store"
import {SharedModule} from "../shared/shared.module";

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
        SharedModule,
    ],
  exports: [
    EditorComponent,
  ],
  providers: [
    EditorStore,
  ]
})
export class EditorModule { }
