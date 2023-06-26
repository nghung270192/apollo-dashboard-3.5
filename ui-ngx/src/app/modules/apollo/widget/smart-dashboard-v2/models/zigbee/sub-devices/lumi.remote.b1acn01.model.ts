import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  EntityState,
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';

import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';

export enum LumiRemoteB1acn01Name {
  status = 'Status',

}

export class LumiRemoteB1acn01Model extends BaseZigbeeDeviceController {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
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

  renderState(): EntityState {
    let stateStr = '';
    let color = 'black';
    const state = this.endPoint.get(LumiRemoteB1acn01Name.status);
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
