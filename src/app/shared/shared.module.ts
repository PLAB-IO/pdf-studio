import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from './ds/atom/button/button.component'
import { TitleComponent } from './ds/atom/title/title.component'

@NgModule({
  declarations: [
    ButtonComponent,
    TitleComponent,
  ],
  exports: [
    ButtonComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
