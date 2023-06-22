import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {ZigbeeDevice} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';

@Component({
  selector: 'tb-zb-node-selection-with-id',
  templateUrl: './zb-node-selection-input-with-id.component.html',
  styleUrls: ['./zb-node-selection-input-with-id.component.scss']
})
export class ZbNodeSelectionInputWithIdComponent implements OnInit {
  @Input() name = 'Chọn Node';
  @Input() datasource: Array<ZigbeeDevice> = [];
  @Input() multiple = false;

  @ViewChild('allSelected') allSelected: MatSelect;

  @Input() nodeId: any;
  @Output() nodeIdChange: EventEmitter<any> = new EventEmitter<any>();


  @Output() closedEvent: EventEmitter<any> = new EventEmitter<any>();

  value: Array<ZigbeeDevice>;
  allSelectedStatus = false;

  formControl = new FormControl('');

  constructor() {
  }

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
