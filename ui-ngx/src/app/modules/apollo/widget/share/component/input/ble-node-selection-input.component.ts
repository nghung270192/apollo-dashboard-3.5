import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NetkeyModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/netkey.model';
import {MatSelect} from '@angular/material/select';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';

@Component({
  selector: 'tb-ble-node-selection-input',
  templateUrl: './ble-node-selection-input.component.html',
  styleUrls: ['./ble-node-selection-input.component.scss']
})
export class BleNodeSelectionInputComponent implements OnInit {
  @Input()name = 'Chọn Node';
  @Input()datasource: Array<NodeModel> = [];
  @Input()multiple = false;

  @ViewChild('allSelected') allSelected: MatSelect;

  @Input()nodes: Array<string>;
  @Output()nodesChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output()closedEvent: EventEmitter<any> = new EventEmitter<any>();

  value: Array<string>;
  allSelectedStatus=false;

  formControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

  optionClick() {
    let newStatus = true;
    this.allSelected.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedStatus = newStatus;
  }

}
