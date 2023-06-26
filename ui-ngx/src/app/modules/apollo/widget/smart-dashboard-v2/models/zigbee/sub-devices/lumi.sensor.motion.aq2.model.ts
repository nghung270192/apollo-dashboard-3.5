import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  EntityState
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  ApolloWidgetContext
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';

export enum LumiSensorMotionAq2Name {
  status = 'Status',
  Illuminance = 'Illuminance',
}

export class LumiSensorMotionAq2Model extends BaseZigbeeDeviceController {

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

    const stateStr = '';
    let color = 'black';
    if (this.endPoint.get(LumiSensorMotionAq2Name.status)) {
      color = this.endPoint.get(LumiSensorMotionAq2Name.status)?.rawState?.color;
    }

    const dvState: EntityState = {
      renderState: 'Ill: ' + this.endPoint.get(LumiSensorMotionAq2Name.Illuminance)?.rawState?.value,
      rawState: {
        color,
        Illuminance: this.endPoint.get(LumiSensorMotionAq2Name.Illuminance)?.rawState?.value
      }
    };
    return dvState;
  }
}
