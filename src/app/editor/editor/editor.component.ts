import {Component, OnInit} from '@angular/core'
import {Element} from '../shared/element-model'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public elements: Element[] = []

  info() {
  }

  ngOnInit(): void {
    this.elements.push({
      id: 'abc',
      name: 'text',
      x: 100,
      y: 10,
      value: '',
      opts: {
        fontSize: 32,
        bold: true,
      }
    })

    this.elements.push({
      id: 'xwed',
      name: 'text',
      x: 200,
      y: 50,
      value: 'Second Title',
      opts: {}
    })
  }
}
