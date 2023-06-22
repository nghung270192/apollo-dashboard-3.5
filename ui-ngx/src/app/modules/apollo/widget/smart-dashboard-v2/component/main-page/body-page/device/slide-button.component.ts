import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent implements OnInit {

  @Input() state: any;
  @Input() size: any;
  @Output() slideTogle = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
