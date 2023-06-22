import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState,
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {ApolloWidgetContext,} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';

import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';

export enum LumiRemoteB286acn01Name {
  status = 'Status',
}
export class LumiRemoteB286acn01Model extends BaseZigbeeDeviceController {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, callback);
  }

  entityClick(): any {
/*    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      data: {
        nodeTreeController: this,
      }
    };
    let sub: any;
    sub = this.dialog-controller.open(ZigbeeControllerComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
      });
    }*/
  }

  renderState(): DeviceState {
    let stateStr = '';
    let color = 'black';
    const state = this.endPoint.get(LumiRemoteB286acn01Name.status);
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
}