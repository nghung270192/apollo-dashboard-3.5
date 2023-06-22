/*
 * Copyright (c) 2023.
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ApolloDeviceModel,
  ApolloSceneSource
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {DeviceId} from '@shared/models/id/device-id';
import {
  ApolloEntityTypeModel
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/create-device-common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tb-setting-group-from-apollo',
  templateUrl: './setting-group-from-apollo.component.html',
  styleUrls: ['./setting-group-from-apollo.component.scss']
})
export class SettingGroupFromApolloComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  @Input() apollo: ApolloWidgetContext;
  @Input() addTrigger: boolean;
  @Input() parentNodeTree: NodeTree;
  @Input() nodeTree: NodeTree;
  @Output() nodesChange: EventEmitter<Array<NodeTree>> = new EventEmitter<Array<NodeTree>>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  nodeTrees: Array<NodeTree> = [];

  devices: Array<Device> = [];

  deviceType: ApolloDeviceModel = ApolloDeviceModel.BLE_SIG_MESH;
  DeviceTypeArray = Object.values(ApolloDeviceModel);
  ApolloDeviceType = ApolloDeviceModel;

  sceneSource: ApolloSceneSource;
  ApolloSceneSourceArray = Object.values(ApolloSceneSource);
  ApolloSceneSource = ApolloSceneSource;


  bleGroupSource: Array<GroupModel> = [];
  groupTarget: Array<string> = [];

  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeSelected: NodeTree;

  name = 'New Group';

  /*
    bleSceneSource: Array<SceneModel> = [];
    bleScene: Array<string> = [];
  */

  bleNetwork: BleNetwork;
  formGroup: FormGroup;

  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
    super();
    this.formGroup = this.buildForm(this.nodeTree);
  }

  buildForm(entity: NodeTree): FormGroup {
    return this.fb.group({
      deviceType: [this.deviceType, [Validators.required, Validators.maxLength(255)]],
      multiple: new FormControl({value: entity?.additionalInfo?.multiple, disabled: true}, Validators.required),
      name: [entity ? entity?.name : '', [Validators.required]],
      label: [entity ? entity?.label : ''],
      groupTarget: [entity ? entity?.additionalInfo.entity : ''],
    });
  }

  updateForm(entity: NodeTree) {
    this.formGroup.patchValue({name: entity.name});
    this.formGroup.patchValue({label: entity.label});
    this.formGroup.patchValue({multiple: entity?.additionalInfo?.multiple, disabled: true});
    this.formGroup.patchValue({groupTarget: entity?.additionalInfo?.entity});
  }

  ngOnInit(): void {
    this.updateForm(this.nodeTree);
    this.groupTarget = this.nodeTree.additionalInfo?.entity;
    this.apollo.apolloNodeTreeService.getByApolloTree(null,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;

        this.apollo.apolloNodeTreeService.getApolloNodeTree(this.nodeTree?.additionalInfo?.hubNodeTreeId.id).subscribe(
          value => {
            this.hubNodeTreeSelected = value;
            this.reloadSceneFromHub();
          }
        );

        this.cd.detectChanges();
      }
    );

    this.cd.detectChanges();
  }

  reloadSceneFromHub() {
    let hub: NodeTreeInfoBaseImpl;
    if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
      hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
    }
    if (hub) {
      this.apollo.ctx.attributeService.getEntityAttributes(hub.tbDeviceId,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));
            if (hub.bleGroups && Array.isArray(hub.bleGroups)) {
              this.bleGroupSource = this.bleNetwork.groups.getDetailGroups(hub.bleGroups);
            }
          } else {
            alert('Chưa import ble network. Vui lòng cấu hình Hub');
          }
        }
      );
    }
  }

  createNodeEntity() {
    this.nodeTree.name = this.formGroup.get('name').value;
    this.nodeTree.additionalInfo.hubNodeTreeId = this.hubNodeTreeSelected.id;
    this.nodeTree.additionalInfo.entity = this.groupTarget;
    this.nodeTrees = [this.nodeTree];

  }


  returnData() {
    /*    if (this.deviceSelected != null)
          this.apolloGatewayAdditionalInfo.tbDeviceId = new DeviceId(this.deviceSelected);
        this.additionalInforChange.emit(this.apolloGatewayAdditionalInfo.toData());*/
  }

  loadNetwork(tbDeviceId: DeviceId) {
    if (tbDeviceId) {
      this.apollo.ctx.attributeService.getEntityAttributes(tbDeviceId,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));

          } else {
            alert('Chưa import ble network.');
          }
        }
      );
    }
  }

  save(): void {
    this.createNodeEntity();
    if (this.nodeTrees && Array.isArray(this.nodeTrees) && this.nodeTrees.length > 0) {
      this.loading = true;
      super.createNodeTrees(this.nodeTrees, this.apollo).subscribe(res => {
        this.createEvent.emit(this.nodeTrees[0]);
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách nhóm trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes
      .addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger
      ?.previousValue != changes.addTrigger?.currentValue
    ) {
      this.save();
    }
  }
}
