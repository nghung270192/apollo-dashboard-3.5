import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {FormControl} from '@angular/forms';
import {HassEntity} from 'home-assistant-js-websocket';
 import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'tb-hass-entity-selection',
  templateUrl: './hass-entity-selection.component.html',
  styleUrls: ['./hass-entity-selection.component.scss']
})
export class HassEntitySelectionComponent implements OnInit {

  @Input()name = 'Chọn Node';
  @Input()datasource: Array<HassEntity> = [];
  @Input()multiple = false;

  @ViewChild('allSelected') allSelected: MatSelect;

  @Input()entities: Array<HassEntity>;
  @Output()entitiesChange: EventEmitter<Array<HassEntity>> = new EventEmitter<Array<HassEntity>>();
  @Output()closedEvent: EventEmitter<any> = new EventEmitter<any>();

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
