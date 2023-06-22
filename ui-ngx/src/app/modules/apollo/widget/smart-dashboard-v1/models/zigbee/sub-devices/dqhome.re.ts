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

import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ConvertBleElementToUnicast,
  DeviceControllerCallbackFunction, DeviceState,
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {
  ApolloWidgetContext,
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {
  BaseZigbeeDeviceController
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';
import {CommonLightControllerComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/common-light-controller.component';
import {DqhomeReName} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re.model';
import {Observable} from 'rxjs';
import {NodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';


export class DqhomeRe extends BaseZigbeeDeviceController {
  private nodeInfo: NodeTreeInfoBase;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, callback);
    this.nodeInfo = nodeTree?.additionalInfo;
  }

  renderState(): DeviceState {
    let stateStr = '';
    let color = 'black';
    const state = this.endPoint.get(DqhomeReName.status);
    if (state) {
      stateStr = state.renderState;
      color = state.rawState.color;
    }

    return {
      renderState: stateStr,
      rawState: {
        color
      }
    };
  }


  hasToggle(): boolean {
    return false;
  }

  getState(params: any): Observable<any> {
    return undefined;
  }

  setState(params: any): Observable<any> {
    console.log(params);
    return this.apollo.hubService.zigbeeHubService.setOnOff(this.hubNode?.additionalInfo?.tbDeviceId?.id, this.addr, params?.index, params?.state);
  }


  entityClick() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        entityController: this,
        apollo: this.apollo
      }
    };
    let sub: any;
    sub = this.dialog.open(CommonLightControllerComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
      });
    }
  }
}
