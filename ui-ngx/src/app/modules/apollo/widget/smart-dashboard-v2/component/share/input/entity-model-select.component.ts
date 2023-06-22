import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  ApolloEntityTypeModel, GatewayModel, GatewayModelLabelMapping,
  NodeTreeType,
  NodeTreeTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';

import {
  HubModel,
  HubModelLabelMapping,
  HubSource,
  HubSourceLabelMapping
} from '@modules/apollo/widget/share/models/apollo-hub/hub.model';

import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  ApolloDeviceModel,
  ApolloDeviceModelLabelMapping, ApolloDeviceSource, ApolloDeviceSourceLabelMapping, ApolloSceneSource,
  ApolloSceneSourceLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';

@Component({
  selector: 'tb-entity-model-select',
  templateUrl: './entity-model-select.component.html',
  styleUrls: ['./entity-model-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityModelSelectComponent),
      multi: true
    }
  ]
})
export class EntityModelSelectComponent implements ControlValueAccessor, OnInit {

  nodeTreeType: any;
  name: string;
  @Input() entityTypeModel: ApolloEntityTypeModel;

  @Input() disable = false;

  onChange: any = (v: any) => {
  };
  onTouched: any = (v: any) => {
  };

  NodeTreeTypes = [];
  NodeTreeTypeLabelMapping: Record<any, string>;


  ngOnInit(): void {
    switch (this.entityTypeModel) {
      case ApolloEntityTypeModel.NodeTreeType:
        this.name = 'Loại thực thể';
        this.NodeTreeTypes = Object.values(NodeTreeType);
        this.NodeTreeTypeLabelMapping = NodeTreeTypeLabelMapping;
        break;
      case ApolloEntityTypeModel.GatewayModel:
        this.name = 'Gateway Model';
        this.NodeTreeTypes = Object.values(GatewayModel);
        this.NodeTreeTypeLabelMapping = GatewayModelLabelMapping;
        break;
      case ApolloEntityTypeModel.HubModel:
        this.name = 'Hub Model';
        this.NodeTreeTypes = Object.values(HubModel);
        this.NodeTreeTypeLabelMapping = HubModelLabelMapping;
        break;
      case ApolloEntityTypeModel.HubSource:

        this.name = 'Nguồn Hub';
        this.NodeTreeTypes = Object.values(HubSource);
        this.NodeTreeTypeLabelMapping = HubSourceLabelMapping;
        break;
      case ApolloEntityTypeModel.ApolloDeviceModel:
        this.name = 'Loại thiết bị';
        this.NodeTreeTypes = Object.values(ApolloDeviceModel);
        this.NodeTreeTypeLabelMapping = ApolloDeviceModelLabelMapping;
        break;
      case ApolloEntityTypeModel.ApolloSceneSource:
        this.name = 'Phạm vi áp dụng';
        this.NodeTreeTypes = Object.values(ApolloSceneSource);
        this.NodeTreeTypeLabelMapping = ApolloSceneSourceLabelMapping;
        break;
      case ApolloEntityTypeModel.ApolloDeviceSource:
        this.name = 'Nguồn thiết bị';
        this.NodeTreeTypes = Object.values(ApolloDeviceSource);
        this.NodeTreeTypeLabelMapping = ApolloDeviceSourceLabelMapping;
        break;
    }
  }

  writeValue(value: any): void {
    this.nodeTreeType = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
