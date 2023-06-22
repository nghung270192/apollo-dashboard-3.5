import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppkeyModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/appkey.model';
 import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'ble-appkey-selection-input',
  templateUrl: './ble-appkey-selection-input.component.html',
  styleUrls: ['./ble-appkey-selection-input.component.scss']
})
export class BleAppkeySelectionInputComponent implements OnInit {

  @Input()name = 'Chọn Netkeys';
  @Input()datasource: Array<AppkeyModel> = [];

  @ViewChild('allSelected') allSelected: MatSelect;

  @Input()appKeys: Array<string>;
  @Output()appKeysChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

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
