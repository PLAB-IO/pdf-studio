import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ElementTitleComponent } from './elements/element-title/element-title.component';
import { ElementSvgComponent } from './elements/element-svg/element-svg.component';
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
    EditorComponent,
    ElementTitleComponent,
    ElementSvgComponent
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
