import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from './ds/atom/button/button.component'
import { TitleComponent } from './ds/atom/title/title.component';
import { InputComponent } from './ds/atom/input/input.component'
import {FormsModule} from "@angular/forms";
import { SelectComponent } from './ds/atom/select/select.component';
import { ColorPickerComponent } from './ds/molecule/color-picker/color-picker.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TitleComponent,
    InputComponent,
    SelectComponent,
    ColorPickerComponent,
  ],
  exports: [
    ButtonComponent,
    TitleComponent,
    InputComponent,
    SelectComponent,
    ColorPickerComponent,
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
