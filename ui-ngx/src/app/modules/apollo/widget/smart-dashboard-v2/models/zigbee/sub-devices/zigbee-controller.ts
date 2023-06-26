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
  ZbStateParams,
  ZigbeeDevice,
  ZigbeeDeviceTypeIconMapping,
  ZigbeeModel
} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {Observable, SubscriptionLike} from 'rxjs';
import {
  DeviceControllerCallbackFunction,
  EntityState,
  EDevCallbackEvent
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  ApolloWidgetContext,
  DataKey
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


export class ZigbeeDeviceImpl implements ZigbeeDevice {
  addr: number;
  model: ZigbeeModel;
  name: string;


  constructor(zigbeeDevice: ZigbeeDevice) {
    this.addr = zigbeeDevice?.addr;
    this.model = zigbeeDevice?.model;
    this.name = zigbeeDevice?.name;
  }
}

export class ZbStateParamsImpl implements ZbStateParams {
  addr: number;
  ep: number;
  state: { name: any; val: any };
  name: string;
  value;

  constructor(zbStateParams: ZbStateParams) {
    this.addr = zbStateParams?.addr;
    this.ep = zbStateParams?.ep;
    this.state = zbStateParams?.state;
    this.name = zbStateParams?.state?.name;
    this.value = zbStateParams?.state?.val;
  }
}

export class BaseZigbeeDeviceController extends DeviceControllerAbstract {

  maxEndpoint = 1;
  endPoint: Map<string, EntityState> = new Map<string, EntityState>([]);
  addr: number;
  model: ZigbeeModel;
  name: string;
  updateTime: number;
  private subscription: SubscriptionLike;
  hubNode: NodeTree;

  constructor(nodeTree: NodeTree,
              public apollo: ApolloWidgetContext,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public callback: DeviceControllerCallbackFunction) {
    super(nodeTree);
    if (this.additionalInfo && this.additionalInfo?.entity) {
      this.addr = this.additionalInfo?.entity?.addr;
      this.model = this.additionalInfo?.entity?.model;
      this.name = this.additionalInfo?.entity?.name;
    }
    if (this.additionalInfo && this.additionalInfo?.hubNodeTreeId) {
      apollo.apolloNodeTreeService.getApolloNodeTree(this.additionalInfo?.hubNodeTreeId.id).subscribe(value => this.hubNode = value);
    }
  }

  getMaxIndex(): number {
    return this.maxEndpoint;
  }

  hasToggle(): boolean {
    return false;
  }

  renderName(): string {
    return this.name;
  }

  renderIcon(): string {
    return ZigbeeDeviceTypeIconMapping[this.model];
  }

  renderIconUrlOnMap(): string {
    return `./assets/apollo/icon/${this.model}.svg`;
  }

  subscribe(): void {
    this.subscription = this.apollo.apolloObserver.subscribe(res => {
      if (res && res?.model === DataKey.ZIGBEE_KEY && this.updateTime !== res?.updateTime) {
        if (res?.key === this.model) {
          this.updateTime = res?.updateTime;
          const params = new ZbStateParamsImpl(res?.params as ZbStateParams);
          if (params.addr === this.addr) {
            this.endPoint.set(params.name, {
              rawState: {
                color: (params.state.val) ? 'red' : 'black',
                value: params.state.val
              },
              renderState: params.name + ' ' + params.ep + ': ' + params.state.val
            });
            if (this.callback) {
              this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
            }
          }
        }
      }
    });
  }


  unSubscribe(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  renderDeviceTypeIcon(): string {
    return '';
  }

  entityClick(): any {
  }

  renderState(): EntityState {
    return undefined;
  }


  toggle(params?: any): Observable<any> {
    return undefined;
  }


}

