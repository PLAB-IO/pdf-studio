import { Component, OnInit } from '@angular/core';
import { CdkDragRelease } from "@angular/cdk/drag-drop";

@Component({
  selector: '[el]',
  templateUrl: './element-title.component.html',
  styleUrls: ['./element-title.component.scss']
})
export class ElementTitleComponent implements OnInit {

  public title = "Default Title"

  constructor() { }

  ngOnInit(): void {
  }

}
