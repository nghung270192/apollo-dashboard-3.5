import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  GatewayModel,
  GatewayModelLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'tb-gateway-model-selection',
  templateUrl: './gateway-model-selection.component.html',
  styleUrls: ['./gateway-model-selection.component.scss']
})
export class GatewayModelSelectionComponent implements OnInit {

  @Input() name = 'Gateway Model';
  @Input() disable = false;
  @Input() selection: GatewayModel;
  @Output() selectionChange: EventEmitter<GatewayModel> = new EventEmitter<GatewayModel>();

  public nodeTreeType = Object.values(GatewayModel);
  public GatewayModelLabelMapping = GatewayModelLabelMapping;

  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }

}
