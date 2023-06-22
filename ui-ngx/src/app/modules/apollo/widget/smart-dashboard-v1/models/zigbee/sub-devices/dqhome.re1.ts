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

import {DqhomeRe} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeviceControllerCallbackFunction} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';

export class DqhomeRe1 extends DqhomeRe {
  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
    this.maxEndpoint = 1;
  }
}
