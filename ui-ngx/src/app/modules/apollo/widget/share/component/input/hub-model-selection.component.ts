import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HubModel, HubModelLabelMapping} from '@modules/apollo/widget/share/models/apollo-hub/hub.model';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'tb-hub-model-selection',
  templateUrl: './hub-model-selection.component.html',
  styleUrls: ['./hub-model-selection.component.scss']
})
export class HubodelSelectionComponent implements OnInit {

  @Input() name = 'Gateway Model';
  @Input() disable = false;
  @Input() selection: HubModel;
  @Output() selectionChange: EventEmitter<HubModel> = new EventEmitter<HubModel>();

  public nodeTreeType = Object.values(HubModel);
  public HubModelLabelMapping = HubModelLabelMapping;

  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }

}
