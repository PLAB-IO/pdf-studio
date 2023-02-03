import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ds-atom-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title: string | undefined
  @Input() subTitle: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
