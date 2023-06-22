import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {
  ApolloWidgetContext
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';

export enum LumiSensorMotionAq2Name {
  status = 'Status',
  Illuminance = 'Illuminance',
}

export class LumiSensorMotionAq2Model extends BaseZigbeeDeviceController {

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

    const stateStr = '';
    let color = 'black';
    if (this.endPoint.get(LumiSensorMotionAq2Name.status)) {
      color = this.endPoint.get(LumiSensorMotionAq2Name.status)?.rawState?.color;
    }

    const dvState: DeviceState = {
      renderState: 'Ill: ' + this.endPoint.get(LumiSensorMotionAq2Name.Illuminance)?.rawState?.value,
      rawState: {
        color,
        Illuminance: this.endPoint.get(LumiSensorMotionAq2Name.Illuminance)?.rawState?.value
      }
    };
    return dvState;
  }
}
