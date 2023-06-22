import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';

@Component({
  selector: 'ble-scene-selection-input',
  templateUrl: './ble-scene-selection-input.component.html',
  styleUrls: ['./ble-scene-selection-input.component.scss']
})
export class BleSceneSelectionInputComponent implements OnInit {

  @Input() name = 'Scene Selection';
  @Input() datasource: Array<SceneModel>;
  @Input() multiple: boolean;

  @Input() selection: Array<string>;
  @Output() selectionChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() closedEvent: EventEmitter<any> = new EventEmitter<any>();


  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }


}
