import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-button-with-processing',
  templateUrl: './button-with-processing.component.html',
  styleUrls: ['./button-with-processing.component.scss']
})
export class ButtonWithProcessingComponent implements OnInit {

  @Input() disable: boolean;
  @Input() size: any = '150';
  @Input() name = 'New Button';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
