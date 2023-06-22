import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl} from '@angular/forms';
import {
  ZigbeeModel,
  ZigbeeModelTypeLabelMapping
} from "@modules/apollo/widget/share/models/zigbee/zigbee.model";
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'tb-zigbee-model-selection',
  templateUrl: './zigbee-model-selection.component.html',
  styleUrls: ['./zigbee-model-selection.component.scss']
})
export class ZigbeeModelSelectionComponent implements OnInit {


  @Input() name = 'Zigbee Model';
  @Input() disable = false;
  @Input() selection: ZigbeeModel;
  @Output() selectionChange: EventEmitter<ZigbeeModel> = new EventEmitter<ZigbeeModel>();

  public nodeTreeType = Object.values(ZigbeeModel);
  public ZigbeeModelTypeLabelMapping = ZigbeeModelTypeLabelMapping;

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  constructor() {
  }

  ngOnInit() {
    this.myControl.setValue(this.selection ? this.selection : '');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<string|ZigbeeModel>(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nodeTreeType.filter(option => option.toLowerCase().includes(filterValue));
  }

  optionCompareFn(option1: any, option2: any): boolean {
    return option1 && option2 ? option1.id === option2.id : option1 === option2;
  }

  onOptionSelected(event: any) {
    const option = event.option.value;
    this.selectionChange.emit(option);
  }

}
