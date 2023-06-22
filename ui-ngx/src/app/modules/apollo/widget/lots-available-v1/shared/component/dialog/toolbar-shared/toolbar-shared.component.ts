import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tb-toolbar-shared',
  templateUrl: './toolbar-shared.component.html',
  styleUrls: ['./toolbar-shared.component.scss']
})
export class ToolbarSharedComponent {


  @Input() icon: string;
  @Input() name: string;
  @Input() isBackButton = false;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() back: EventEmitter<any> = new EventEmitter<any>();

}
