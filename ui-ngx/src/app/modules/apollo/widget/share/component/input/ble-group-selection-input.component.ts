import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';

@Component({
  selector: 'ble-group-selection-input',
  templateUrl: './ble-group-selection-input.component.html',
  styleUrls: ['./ble-group-selection-input.component.scss']
})
export class BleGroupSelectionInputComponent implements OnInit {

  @Input() name = 'New Entity';
  @Input() datasource: Array<GroupModel>;
  @Input() groups: any;
  @Input() multiple = false;
  @Output() groupsChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() closedEvent: EventEmitter<any> = new EventEmitter<any>();

  value: any;

  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    this.value = this.groups;
  }

  selectionChangeEvent() {
    this.groupsChange.emit(this.value);
  }


}
