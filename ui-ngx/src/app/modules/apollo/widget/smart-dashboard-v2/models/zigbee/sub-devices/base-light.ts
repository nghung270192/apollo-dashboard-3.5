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

import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction, DeviceState, ElementToUnicast,
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  ApolloWidgetContext,
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {
  BaseZigbeeDeviceController
} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';
import {DqhomeReName} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/dqhome.re.model';
import {Observable} from 'rxjs';
import {NodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';


export class BaseLight extends BaseZigbeeDeviceController {
  public nodeInfo: NodeTreeInfoBase;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
    this.nodeInfo = nodeTree?.additionalInfo;
  }

  getHsl(params: any): Observable<any> {
    return undefined;
  }

  getLightness(params: any): Observable<any> {
    return undefined;
  }

  setHsl(params: any): Observable<any> {
    return undefined;
  }

  setLightness(params: any): Observable<any> {
    return undefined;
  }

  setState(params: any): Observable<any> {
    return undefined;
  }
}
