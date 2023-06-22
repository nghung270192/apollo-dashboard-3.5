import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppkeyModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/appkey.model';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NetkeyModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/netkey.model';

@Component({
  selector: 'tb-ble-netkey-selection-input',
  templateUrl: './ble-netkey-selection-input.component.html',
  styleUrls: ['./ble-netkey-selection-input.component.scss']
})
export class BleNetkeySelectionInputComponent implements OnInit {
  @Input()name = 'Chọn Netkeys';
  @Input()datasource: Array<NetkeyModel> = [];

  @ViewChild('allSelected') allSelected: MatSelect;

  @Input()netKeys: Array<string>;
  @Output()netKeysChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  value = '';
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
